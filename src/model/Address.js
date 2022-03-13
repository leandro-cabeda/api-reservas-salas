module.exports = app => {

    const { Connect, Sequelize } = app.src.database.database;

    const Address = Connect.define("enderecos", {
        logradouro: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        bairro: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cidade: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pais: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cep: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                not: ['[a-z]', 'i']
            },
        },
        complemento: {
            type: Sequelize.STRING,
        },
        numero: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    Address.sync({ force: false });

    return Address;
};
