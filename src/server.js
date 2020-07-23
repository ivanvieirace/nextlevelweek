// Importação do Express
const express = require("express");
const server = express();

// Express acesso a pasta Public
server.use(express.static("public"));

// Nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// Express escutando na porta 3000
server.listen(3000);

// Rotas
server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.get("/search-results", (req, res) => {
  return res.render("search-results.html");
});
