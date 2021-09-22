const { ObjectID } = require('mongodb');
const { UserController } = require('../controllers');
const { UserService } = require('../services');
const { User } = require('../models');
const { userRoute } = require('../routes');
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

    console.log(this.successInjection);
    return { userController };
  }

  routes(controller) {
    const user = userRoute(controller.userController);

    console.log(this.successRoutes);
    return { user };
  }
}

module.exports = new Configure();