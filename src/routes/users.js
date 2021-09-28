const rescue = require('express-rescue');
const controller = require('../controllers/users');
const { tokenValidation } = require('../middlewares/token');

function users(app) {
  app.route('/users/admin')
    .post(rescue(tokenValidation), rescue(controller.newUser));
  app.route('/users')
    .post(rescue(controller.newUser));
  app.route('/login')
    .post(rescue(controller.login));
}

module.exports = users;