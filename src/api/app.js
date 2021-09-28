const express = require('express');
const bodyParser = require('body-parser').json();
const multer = require('multer');
const Err = require('../midd/err');
const Users = require('../controllers/userControler');
const Recipes = require('../controllers/recipesController');
const { RecipVal } = require('../midd/validation');

const app = express();

app.use(bodyParser);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

/* user */
app.post('/users', Users.createNewUser);
app.post('/login', Users.loginController);
/* crud */
app.post('/recipes', RecipVal, Recipes.createNewRecipe);
app.get('/recipes', Recipes.getAllRecipes);
app.put('/recipes/:id', RecipVal, Recipes.rcpUpdate);
app.delete('/recipes/:id', RecipVal, Recipes.rcpDelet);
/* especifico e upload */
app.get('/recipes/:id', Recipes.oneRecp);
app.put('/recipes/:id/image/', upload.single('image'), RecipVal, Recipes.createImg);

app.use(Err);

module.exports = app;
