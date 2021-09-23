const { ObjectID } = require('mongodb');
const { UserController, LoginController, RecipeController } = require('../controllers');
const { UserService, LoginService, RecipeService, AuthenticateService } = require('../services');
const { User, Recipe } = require('../models');
const { userRoute, loginRoute, recipeRoute } = require('../routes');
const { UserSerializer, RecipeSerializer } = require('../models/serializers');

class Configure {
  constructor() {
    this.successInjection = 'Injection succeded';
    this.successRoutes = 'Routes configured';
  }

  injection(db) {
    const userModel = new User(db, ObjectID, UserSerializer);
    const userService = new UserService(userModel);
    const userController = new UserController(userService);

    const loginService = new LoginService(userModel, AuthenticateService);
    const loginController = new LoginController(loginService);

    const recipeModel = new Recipe(db, ObjectID, RecipeSerializer);
    const recipeService = new RecipeService(recipeModel, AuthenticateService);
    const recipeController = new RecipeController(recipeService);

    console.log(this.successInjection);
    return { userController, loginController, recipeController };
  }

  routes(controller) {
    const user = userRoute(controller.userController);
    const login = loginRoute(controller.loginController);
    const recipe = recipeRoute(controller.recipeController);

    console.log(this.successRoutes);
    return { user, login, recipe };
  }
}

module.exports = new Configure();