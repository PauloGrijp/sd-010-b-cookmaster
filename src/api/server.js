const bodyParser = require('body-parser');
const app = require('./app');
const userMiddlewares = require('../../middlewares/userMiddleware');
const recipeMiddlewares = require('../../middlewares/recipeMiddlewares');
const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const login = require('../../controllers/login');
const validateJWT = require('../../auth/validateJWT');

app.use(bodyParser.json());

app.post(
  '/users',
  userMiddlewares.validateNameAndPassword,
  userMiddlewares.validateEmail,
  userController.createUser,
);

app.post(
  '/login',
  userMiddlewares.validateLogin,
  login,
);

app.post(
  '/recipes',
  validateJWT,
  recipeMiddlewares.validateFields,
  recipeController.createRecipe,
);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
