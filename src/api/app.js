const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/usersRoute');
const loginRouter = require('./routes/loginRoute');
const recipesRouter = require('./routes/recipesRoute');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(`${__dirname}/../uploads`));
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

module.exports = app;
