const rescue = require('express-rescue');
const controller = require('../Controllers/Users');
const internalError = require('../middlewares/testInternalError');
const utils = require('../utils/token');

const users = (app) => {
  app.route('/users')
    .post(rescue(controller.newUser));

  app.route('/login')
    .post(rescue(controller.login));

  app.route('/users/admin')
    .post(rescue(utils.validateToken), rescue(controller.newAdmin));
    
  app.route('/error_test')
    .get(rescue(internalError));
};
module.exports = users;