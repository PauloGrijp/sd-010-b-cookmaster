// Source: https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/096ab7ca-bfa4-41d2-9b14-fe5a42aa956c/implementando-jwt/e8ebbc5b-1a0d-4baa-97df-d355be493891?use_case=side_bar

// const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret = 'hipersecrettoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = ({ id, email, role }) => {
  const token = jwt.sign({ id, email, role }, secret, jwtConfig);

  return token;
};

module.exports = { generateToken };