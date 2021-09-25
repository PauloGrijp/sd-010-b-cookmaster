const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const errosMiddleware = require('../middlewares/errosMiddlewares');
const usersRoute = require('../routes/usersRoute');
const recipesRoute = require('../routes/recipesRoute');

app.use(bodyParser.json());

usersRoute(app);
recipesRoute(app);
app.use(errosMiddleware);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
