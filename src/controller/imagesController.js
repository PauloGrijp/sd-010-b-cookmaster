const express = require('express');
const { validateJWT } = require('../middlewares/loginMiddlewares');

const imagesRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 10: CONTROLLER responsável por receber a requisição para armazenar path da imagem da receita, chamar SERVICE e retornar informações da receita armazenada.

imagesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const imageRecipeUpdated = await putRecipeImageByIdService({
    recipeId: id,
    reqUserId: _id,
    role,
    filename,
  });
  
  imageRecipeUpdated.image = `localhost:3000/src/uploads/${imageRecipeUpdated.image}`;

  return res.status(200).json(imageRecipeUpdated);
});

// ---------------------------------------------------------------

module.exports = { imagesRouter };
