const app = require("./src/server");

const port = process.env.PORT || 3000;

const { Connect } = app.src.database.database;

// Realiza a conexão com banco postgreSQL
Connect.authenticate()
  .then(() => {
    console.log("Conexão estabelicida com PostgreSql");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}.`);
});
