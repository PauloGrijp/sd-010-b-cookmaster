const bodyParser = require('body-parser');
const app = require('./app');
const signUpMiddleware = require('../middlewares/signUpMiddleware');
const loginMiddleware = require('../middlewares/loginMiddlewares');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const recipesMiddlewares = require('../middlewares/recipesMiddlewares');

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users',
signUpMiddleware.validateName,
signUpMiddleware.validateEmail,
signUpMiddleware.validatePassword,
userController.signUp);

app.post('/login',
loginMiddleware.checkEmailPassword,
loginMiddleware.validateEmailPassword,
userController.login);

app.get('/recipes/:id', recipesController.getRecipeById);
app.get('/recipes', recipesController.getRecipes);

app.post('/recipes',
recipesMiddlewares.validateCreateFields,
recipesController.create);
