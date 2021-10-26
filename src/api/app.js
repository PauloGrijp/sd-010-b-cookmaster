const express = require('express');

const bodyParser = require('body-parser');
const multer = require('multer');
// import path
const path = require('path');

const { error, validate, authJWT } = require('../middlewares');
const { userController, recipeController } = require('../controllers');

const app = express();

app.use(bodyParser.json());
// Não usado urlencoded , pois não há alteração na url.
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname));
// // /images é o caminho/end-point da API onde as imagens estarão disponíveis
// // path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// // a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

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

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
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

module.exports = app;
