module.exports = app => {

  const { Connect, Sequelize } = app.src.database.database;

  // id: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   allowNull: false,
  //   primaryKey: true
  // },

  const User = Connect.define("usuarios", {

    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.sync({ force: false });


  return User;
};
