const rescue = require('express-rescue');
const controller = require('../controllers/users');

function users(app) {
  app.route('/users')
    .post(rescue(controller.newUser));
}

module.exports = users;
