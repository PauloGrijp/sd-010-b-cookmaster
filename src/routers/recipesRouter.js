const express = require('express');
const multer = require('multer');

const router = express.Router();

const recipesController = require('../controllers/recipesControllers');

const storage = multer.diskStorage({
    // local onde sera armazenado no PC
    destination: (req, file, callback) => {
      callback(null, 'src/uploads');
    },
    filename: (req, file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
    },
    mimetype: (req, file, callback) => {
      callback(null, 'image/jpeg');
    },

});

const upload = multer({ storage });

const { 
    recipeFields,
    validateToken,
    validateId,
    validateAdminToken,
    validateTokenForDelete,
    
  } = require('../services/recipesService');

router.post('/', recipeFields, validateToken, recipesController.recipeRegistration); 
router.get('/', recipesController.findAllRecipes); 
router.get('/:id', validateId, recipesController.findRecipeById); 
router.put('/:id', validateAdminToken, recipesController.updateByid); 
router.delete('/:id', validateTokenForDelete, recipesController.deleteByid); 
router.put('/:id/image', validateTokenForDelete, 
  upload.single('image'), recipesController.updateImageById);
// app.use((err, req, res, _next) => 
// res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

module.exports = router;