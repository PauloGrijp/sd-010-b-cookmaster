const route = require('express').Router();
const rescue = require('express-rescue');
const validations = require('../utils/validations');

route.post('/', rescue(validations.validToken));

module.exports = route;
