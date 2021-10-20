const express = require('express');
const { recipesControllers } = require('../controllers');
const {
  authorization,
  upload,
 } = require('../middlewares');

const recipesRoutes = express.Router();

recipesRoutes.put('/:id/image',
  authorization,
  recipesControllers.upload,
  upload.single('image'),
  (req, res) => res.status(200).json(req.recipe));
recipesRoutes.get('/:id', recipesControllers.getById);
recipesRoutes.put('/:id', authorization, recipesControllers.update);
recipesRoutes.delete('/:id', authorization, recipesControllers.remove);
recipesRoutes.get('/', recipesControllers.get);
recipesRoutes.post('/', authorization, recipesControllers.create);

module.exports = recipesRoutes;
