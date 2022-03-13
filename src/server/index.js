const express = require("express");
const app = express();
const consign = require("consign");

consign()
    .then("./src/database/database.js")
    .then("./src/middleware")
    .then("./src/model")
    .then("./src/service")
    .then("./src/controller")
    .then("./src/route")
    .into(app);


module.exports = app;