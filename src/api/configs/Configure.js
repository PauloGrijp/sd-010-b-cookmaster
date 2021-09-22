const { ObjectID } = require('mongodb');
const { UserController, LoginController } = require('../controllers');
const { UserService, LoginService } = require('../services');
const { User } = require('../models');
const { userRoute, loginRoute } = require('../routes');
const { UserSerializer } = require('../models/serializers');

class Configure {
  constructor() {
    this.successInjection = 'Injection succeded';
    this.successRoutes = 'Routes configured';
  }

  injection(db) {
    const userModel = new User(db, ObjectID, UserSerializer);
    const userService = new UserService(userModel);
    const userController = new UserController(userService);

    const loginService = new LoginService(userModel);
    const loginController = new LoginController(loginService);

    console.log(this.successInjection);
    return { userController, loginController };
  }

  routes(controller) {
    const user = userRoute(controller.userController);
    const login = loginRoute(controller.loginController);

    console.log(this.successRoutes);
    return { user, login };
  }
}

module.exports = new Configure();