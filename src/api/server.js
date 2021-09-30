const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const app = require('./app');
const { createUser } = require('../controller/users');
const { createRecipe, getAllRecipes, getRecipeId,
  updateRecipe, deleteRecipe, uploadImage } = require('../controller/recipes');
  const { validateToken } = require('../middlewares/validateToken');
  const { login } = require('../controller/login');
  
const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadMiddleware = multer({ storage });

app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', validateToken, createRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeId);
app.put('/recipes/:id', validateToken, updateRecipe);
app.put('/recipes/:id/image', validateToken, uploadMiddleware.single('image'), uploadImage);
app.delete('/recipes/:id', validateToken, deleteRecipe);
