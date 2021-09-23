const express = require('express');
const { createusers } = require('../2controller/usersControlles');

const rota = express.Router();

rota.post('/users', createusers);

module.exports = rota;