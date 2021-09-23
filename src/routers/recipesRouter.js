const express = require('express');
const controller = require('../controllers/recipes');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.cadastrarReceitas);

router.get('/', controller.buscarReceitas);

router.get('/:id', controller.buscarReceitasID);

router.put('/:id', validateJWT, controller.editarReceita);

router.delete('/:id', validateJWT, controller.deleteReceita);

module.exports = router;