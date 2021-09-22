const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const multer = require('multer');

const UserMiddleweres = require('../middlewares/userMiddleweres/index');
const { validateRecipe, validateToken } = require('../middlewares/recipesMiddleweres/index');
const users = require('../controller/users');
const recipes = require('../controller/recipes');

const app = express();
// app.use(
//   cors({
//     origin: `http://localhost:${3000}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Authorization'],
//   }),
// );

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  // filename: (req, file, callback) => {
  //   callback(null, `localhost:3000/src/uploads/${req.params.id}.jpg`);
  // },
  filename: (req, file, callback) => {
    console.log('req', req.params.id);
    callback(null, `${req.params.id}.jpg`);
  },
  // filename: (req, file, callback) => {
  //   console.log('req', req.params.id);
  //   callback(null, `${Date.now()}-${file.originalname}`);
  // },
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
const upload = multer({ storage });

app.put('/recipes/:id/image', validateToken, upload.single('image'), recipes.insertImage);
app.delete('/recipes/:id', validateToken, recipes.deleteRecipe);
app.put('/recipes/:id', validateRecipe, validateToken, recipes.updateRecipe);
app.post('/users', UserMiddleweres.validateUser, users.createUser);
app.post('/login', UserMiddleweres.validateLogin, users.loginUser);
app.post('/recipes', validateRecipe, validateToken, recipes.createRecipes);
app.get('/recipes/:id', recipes.findRecipe);
app.get('/recipes', recipes.getAll);

module.exports = app;
