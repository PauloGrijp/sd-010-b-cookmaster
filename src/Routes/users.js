const rescue = require('express-rescue');
const controller = require('../Controllers/Users');
const internalError = require('../middlewares/testInternalError');

const users = (app) => {
  app.route('/users')
    .post(rescue(controller.newUser));
  app.route('/login')
    .post(rescue(controller.login));
  app.route('/error_test')
    .get(rescue(internalError));
};
module.exports = users;