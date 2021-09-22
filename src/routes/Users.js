const express = require('express');

const User = require('../controllers/Users');

const users = express.Router();

users.post('/users', User.createUser);

module.exports = users; 