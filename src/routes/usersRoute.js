const rescue = require('express-rescue');
const { createUserC, checkLoginC } = require('../controllers/usersController');

const users = (app) => {
  app.route('/users').post(rescue(createUserC));
  app.route('/login').post(rescue(checkLoginC));
};

module.exports = users; 