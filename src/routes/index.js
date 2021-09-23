const express = require('express');

const User = require('../controllers/Users');
const Login = require('../controllers/Login');

const users = express.Router();

users.post('/users', User.createUser);
users.post('/login', Login.login);

module.exports = users; 