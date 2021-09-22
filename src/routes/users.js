const express = require('express');

const {
  create,
} = require('../controllers/users');

const route = express.Router();

route.post('/', create);

module.exports = route;
