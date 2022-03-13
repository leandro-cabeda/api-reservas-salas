module.exports = app => {

  const { Connect, Sequelize } = app.src.database.database;
  const Room = app.src.model.Room;

  const Schedule = Connect.define("agendas", {
    periodo: {
      type: Sequelize.STRING,
    },
    data_agendamento: {
      type: Sequelize.DataTypes.DATEONLY,
    },
  });

  Room.hasMany(Schedule);
  Schedule.belongsTo(Room);

  /* É definido esse relacionamento para criar chave estrangeira de outra entidade como de exemplo:
        Room.hasMany(Schedule);
        Schedule.belongsTo(Room);

        Só se não for definido
        o campo na entidade acima como exemplo:
        sala_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: Room,
          key: 'id'
        }
      },
    
    */

  Schedule.sync({ force: false });

  return Schedule;
};
