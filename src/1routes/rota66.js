const express = require('express');
const { createUsers, login } = require('../2controller/usersController');

const rota = express.Router();

rota.post('/users', createUsers);
rota.post('/login', login);

module.exports = rota;