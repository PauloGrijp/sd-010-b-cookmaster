const rescue = require('express-rescue');
const controller = require('../controllers/users');

function users(app) {
  app.route('/users')
    .post(rescue(controller.newUser));
  app.route('/login')
    .post(rescue(controller.login));
}

module.exports = users;
