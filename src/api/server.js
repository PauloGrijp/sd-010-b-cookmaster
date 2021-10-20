const bodyParser = require('body-parser'); // extrair info do body
const app = require('./app');

const { error, validate, authJWT } = require('../middlewares');
const { userController, recipeController } = require('../controllers');

app.use(bodyParser.json());

// rotas
app.post('/users', validate.createUser, userController.createUser);
app.post('/login', validate.login, userController.login);
app.post('/recipes', authJWT, validate.createRecipe, recipeController.createRecipe);
app.get('/recipes', recipeController.getAllRecipes);
app.get('/recipes/:id', recipeController.getRecipeById);
app.put('/recipes/:id', authJWT, recipeController.updateRecipe);
app.delete('/recipes/:id', authJWT, recipeController.deleteRecipe);

app.use(error);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
