const Sequelize = require("sequelize");

const Connect = new Sequelize(
    "reservas",
    "usuario",
    "senha", {
    host: "localhost",
    dialect: "postgres",
    timezone: "-03:00",
    define: { timestamps: false }
});

module.exports = {
    Connect,
    Sequelize
};