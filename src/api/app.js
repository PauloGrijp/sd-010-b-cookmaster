const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const user = require('../controllers/UsersControllers');
const login = require('../controllers/LoginControllers');
const recipes = require('../controllers/RecipesControllers');
const validate = require('../services/autentication');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'src/uploads'); },
  filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },
});

const upload = multer({ storage });

app.post('/users', user.createItem);
app.post('/login', login.login);
app.post('/users/admin', validate, user.createAdm);

app.put('/recipes/:id/image/', validate, upload.single('image'), recipes.storeImage);
app.post('/recipes', validate, recipes.createItem);
app.get('/recipes', recipes.getAll);
app.get('/recipes/:id', recipes.getRecipesById);
app.put('/recipes/:id', validate, recipes.updateRecipe);
app.delete('/recipes/:id', validate, recipes.deleteRecipe);

module.exports = app;
