const express = require('express');
const multer = require('multer');
const path = require('path');

const controllers = require('../controllers');
const middlewares = require('../middlewares');

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const fileNameConstruction = `${req.params.id}.jpeg`;
    callback(null, fileNameConstruction);
    req.image = `localhost:3000/src/uploads/${fileNameConstruction}`;
  },
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
 });
 const upload = multer({ storage });

const router = express.Router();

router.post('/users', middlewares.doubleEmail, controllers.postUsersController);

router.post('/login', controllers.login);

router.post('/recipes', middlewares.validateToken, controllers.postRecipeController);

router.get('/recipes', controllers.getRecipesController);

router.get('/recipes/:id', controllers.getRecipeByIdController);

router.put('/recipes/:id', middlewares.validateToken, controllers.putRecipeByIdController);

router.delete('/recipes/:id', middlewares.validateToken, controllers.deleteRecipeByIdController);

router.put('/recipes/:id/image/', 
middlewares.validateToken, upload.single('image'), controllers.putImageController);

module.exports = router;
