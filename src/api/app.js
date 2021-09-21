const express = require('express');

const app = express();

const userRoutes = require('../routes/usuarios.routes');
const recipesRoutes = require('../routes/recipes.routes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.json());

// https://expressjs.com/pt-br/starter/static-files.html  
app.use('/images', express.static(`${__dirname}/../uploads`));

app.use(userRoutes);
app.use(recipesRoutes);

module.exports = app;

//  deletei a pasta index.js após ajuda do Henrique Clementino para fazer o requisito 10