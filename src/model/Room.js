module.exports = app => {

    const { Connect, Sequelize } = app.src.database.database;
    const Address = app.src.model.Address;

    const Room = Connect.define("salas", {
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imagem: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Address.hasMany(Room);
    Room.belongsTo(Address);

    /* É definido esse relacionamento para criar chave estrangeira de outra entidade como de exemplo:
        Address.hasMany(Room);
        Room.belongsTo(Address);

        Só se não for definido
        o campo na entidade acima como exemplo:
        endereco_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: Address,
                key: 'id'
            }
        },
     */

    Room.sync({ force: false });

    return Room;
};
