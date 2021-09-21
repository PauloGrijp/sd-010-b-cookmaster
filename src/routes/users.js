const express = require('express');

const {
  create,
} = require('../controllers/users');

const { login } = require('../controllers/login');

const route = express.Router();

route.post('/', create);

route.post('/', login);

module.exports = route;
