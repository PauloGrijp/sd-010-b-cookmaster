const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const controllers = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const middlewareError = require('../middlewares/erro');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', controllers.createUser);

app.post('/login', authentication.login, controllers.login);

app.post('/recipes', authorization.verifyToken, controllers.createRecipe);

app.get('/recipes', controllers.getRecipes);

app.get('/recipes/:id', controllers.getRecipeById);

app.put('/recipes/:id', authorization.verifyToken, controllers.editRecipe);

app.delete('/recipes/:id', authorization.verifyToken, controllers.deleteRecipe);

app.put('/recipes/:id/image',
  authorization.verifyToken, upload.single('image'), controllers.upload);

app.use(middlewareError);

module.exports = app;
