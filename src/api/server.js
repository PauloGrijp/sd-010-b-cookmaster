const bodyParser = require('body-parser');
const multer = require('multer');
const app = require('./app');

const { error, validate, authJWT } = require('../middlewares');
const { userController, recipeController } = require('../controllers');

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../uploads`);
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/users', validate.createUser, userController.createUser);
app.post('/login', validate.login, userController.login);

app.get('/recipes', recipeController.getAllRecipes);
app.post('/recipes', authJWT, validate.createRecipe, recipeController.createRecipe);
app.get('/recipes/:id', recipeController.getRecipeById);
app.put('/recipes/:id', authJWT, recipeController.updateRecipe);
app.put('/recipes/:id/image/', authJWT, upload.single('image'), recipeController.updateRecipe);
app.delete('/recipes/:id', authJWT, recipeController.deleteRecipe);

app.use(error);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
