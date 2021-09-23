const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const app = require('./app');
const signUpMiddleware = require('../middlewares/signUpMiddleware');
const loginMiddleware = require('../middlewares/loginMiddlewares');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const recipesMiddlewares = require('../middlewares/recipesMiddlewares');
const userMiddlewares = require('../middlewares/userMiddlewares');

app.use(bodyParser.json());
app.use(express.static('uploads'));

const PORT = 3000;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../uploads`);
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users',
signUpMiddleware.validateName,
signUpMiddleware.validateEmail,
signUpMiddleware.validatePassword,
userController.signUp);

app.post('/login',
loginMiddleware.checkEmailPassword,
loginMiddleware.validateEmailPassword,
userController.login);

app.get('/recipes/:id', recipesController.getRecipeById);
app.get('/recipes', recipesController.getRecipes);

app.post('/recipes',
recipesMiddlewares.validateRecipeFields,
recipesController.create);

app.put('/recipes/:id', recipesController.edit);

app.delete('/recipes/:id', recipesController.exclude);

app.put('/recipes/:id/image/',
userMiddlewares.validateJWT,
userMiddlewares.validateUser,
upload.single('image'), recipesController.addImage);

// (req, res) => {
//   const { file } = req;
//   return res.status(200).json(file);
// };