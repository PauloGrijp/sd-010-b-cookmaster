const rescue = require('express-rescue');
const { createUserAdminC, createUserC, checkEmailC } = require('../controllers/usersController');
const { validTokenUser } = require('../middlewares/tokenMiddlewares');

const users = (app) => {
  app.route('/users').post(rescue(createUserC));
  app.route('/login').post(rescue(checkEmailC));
  app.route('/users/admin').post(rescue(validTokenUser), rescue(createUserAdminC));
};

module.exports = users;
