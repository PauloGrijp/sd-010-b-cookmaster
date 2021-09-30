const express = require('express');
const bodyParser = require('body-parser');
const erroMidd = require('../midd/erro');
const rotas = require('./routes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/users', rotas.Users);
app.use('/login', rotas.Login);
app.use('/recipes', rotas.Recipes);
app.use('/images', express.static('src/uploads'));
app.use(erroMidd);

module.exports = app;

// este projeto esta sendo executado com ajuda de colegas e pesquisas em repositórios, principalmente da turma 9 e 8;
// essa materia ainda esta bem confusa pra mim, por isso além da explicações que estou recebendo, estou tentando enteder atraves das consultas;