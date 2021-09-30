const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const User = require('./controllers/controllersUsers');
const Recipe = require('./controllers/controllersRecipes');
const { validateToken } = require('./schema/validateJWT');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
  mimetype: (req, file, callback) => {
    callback(null, 'image/png');
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', User.create);
app.post('/login', User.login);
app.post('/recipes', validateToken, Recipe.createRecipe);

app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getRecipeById);

app.put('/recipes/:id', validateToken, Recipe.updateRecipe);
app.put('/recipes/:id/image/', validateToken, upload.single('image'), Recipe.updateImage);

app.delete('/recipes/:id', validateToken, Recipe.deleteRecipe);

module.exports = app;
