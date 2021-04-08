const express = require("express");
const connection = require("./database/database");
const server = express();


//View Engine
server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//Database

connection.authenticate().then(() => {
  console.log("Conexão feita com sucesso!")
}).catch((error) => {
  console.log(`Erro ao se conectar com o Banco de Dados ${erro}`)
});

server.get("/", (request, response) => {
  response.render("index");
});

server.listen(3000, () => {
  console.log("Server is running");
});