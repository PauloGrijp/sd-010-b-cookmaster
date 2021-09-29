const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const app = require('./app');
const { createUser } = require('../controllers/userController');
const { createRecipe, getAllRecipes, getRecipe, 
  updateRecipe, deleteRecipe, uploadImage } = require('../controllers/recipeCrontroller');
const { login } = require('../controllers/login');
const { validateToken } = require('../middlewares/validateToken');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads/'),
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
app.get('/recipes/:id', getRecipe);
app.put('/recipes/:id', validateToken, updateRecipe);
app.delete('/recipes/:id', validateToken, deleteRecipe);
app.put('/recipes/:id/image', validateToken, uploadMiddleware.single('image'), uploadImage);
