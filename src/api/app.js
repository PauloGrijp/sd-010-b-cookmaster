const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const userController = require('./controller/userController');
const recipesController = require('./controller/recipesController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.createUser);
app.post('/login', userController.login);

app.use('/images', express.static('src/uploads'));
app.get('/recipes/:id', recipesController.getByIdRecipes);
app.get('/recipes', recipesController.getAllRecipes);
app.put('/recipes/:id', recipesController.updateByIdRecipes);
app.put('/recipes/:id/image', upload.single('image'), recipesController.createImageRecipe);
app.post('/recipes', recipesController.createRecipes);
app.delete('/recipes/:id', recipesController.deleteByIdRecipes);

module.exports = app;