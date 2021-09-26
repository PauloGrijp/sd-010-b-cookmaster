const express = require('express');
const path = require('path');

const imagesRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 10: CONTROLLER responsável por receber a requisição de visualização da imagem da receita por ID e retornar a imagen.

imagesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const staticDestination = path.join(__dirname, '..', 'uploads', id);

  const image = staticDestination;

  return res.status(200).sendFile(image);
});

// ---------------------------------------------------------------

module.exports = { imagesRouter };
