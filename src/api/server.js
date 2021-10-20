const bodyParser = require('body-parser'); // extrair info do body
const multer = require('multer'); // mandar ou receber arquivos.
const app = require('./app');

const { error, validate, authJWT } = require('../middlewares');
const { userController, recipeController } = require('../controllers');

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../uploads`);
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const fileFilter = (_req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  if (file.mimetype !== 'image/jpeg') {
    return cb(null, false);
  }

  return cb(null, true);
};

const upload = multer({ storage, fileFilter });

// rotas
app.post('/users', validate.createUser, userController.createUser);
app.post('/login', validate.login, userController.login);
app.get('/images/:id.jpeg', recipeController.getImage);

app.get('/recipes', recipeController.getAllRecipes);
app.post('/recipes', authJWT, validate.createRecipe, recipeController.createRecipe);
app.get('/recipes/:id', recipeController.getRecipeById);
app.put('/recipes/:id', authJWT, recipeController.updateRecipe);
app.put('/recipes/:id/image/', authJWT, upload.single('image'), recipeController.updateRecipe);
app.delete('/recipes/:id', authJWT, recipeController.deleteRecipe);

app.use(error);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
