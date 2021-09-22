const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const secret = 'shhh';

const options = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const {
  checkBodyLogin,
  checkAssertionLogin,
} = require('../middlewares/usersMiddlewares');

const httpStatus = require('../controller/httpStatus');

const userRoute = require('../controller/users');
const recipesRoute = require('../controller/recipe');

const app = express();

app.use(bodyParser.json());
app.use('/recipes', recipesRoute);
app.use('/users', userRoute);

app.post('/login',
  checkBodyLogin,
  checkAssertionLogin,
  async (req, res) => {
    const { email, password } = req.body;
    const user = {
      email,
      password,
    };
    const token = jwt.sign({ data: user }, secret, options);
    res.status(httpStatus.ok).json({ token });
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
