// Importação do Express
const express = require("express");
const server = express();

//configurar a pasta public para o express
server.use(express.static("public"));

//Utilizando Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// Servidor Express Iniciado na porta 3000
server.listen(3000);
console.log("Servidor Rodando e Escutando na porta 3000");

//Configuração das Rotas da Aplicação:

// Rota da Página Inicial:
server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.get("/search-results", (req, res) => {
  return res.render("search-results.html");
});
