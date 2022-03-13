# Desafio Agendamento de Salas Reserva Empresa Clina

Desafio realizado com framework Express, Interpretador JavaScript NodeJS, implementando uma API REST de cadastrado de usuários e agendamento de reservas de salas. Acesso ao criar agendamento e buscar reservas só com autenticação do usuário.

## **Configuração!**
Necessita configurar senha e o usuario do banco na pasta e arquivo ./database/database.js, nele contém toda configuração necessária.

## **Instruções para Rodar**
1. Executar comando: npm i --save ou npm install --save
2. Criar uma Database com nome: reservas
 - Mas fica livre o nome da Database que for escolher ao mudar.
3. Executar o comando: npm start
- Isto faz subir aplicação e depois so acessar a url localhost
- Porta padrão e definida é a 3000

## **Testar a Aplicação**
- Pode realizar o teste via Postman que irei mandar junto com projeto e depois só importar.
- Postman Collection chamado: Clina_Reservas_Api.postman_collection

## **Informações para o Banco de Dados**

- Estou mandando junto um arquivo com as instruções de inserção dos dados direto no banco para testar.
- Obs importante: Se por um momento der erro quando subir a aplicação por causa da criação das tabelas pelo sequeliza referente os modelos descritos na pasta model, sugiro que suba de novo aplicação pelo fato que as vezes o sequelize se perde com as configurações referente do banco para se conectar e criar.
- Outro ponto importante: Caso de inserir as informações direto no banco e der erro principalmente na tabela de salas por causa do campo "enderecoId", eu sugiro que retire esse campo e so salva o restante, e depois vai na tabela direto e insere manualmente a informação nesse campo clicando em editar na tabela em si.

## **Informações pelo email**
Qualquer dúvida, por favor, entre em contato com **[Leandro](mailto:leandro.cabeda@hotmail.com)**.
