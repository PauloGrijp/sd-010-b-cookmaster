const express = require('express');
const controller = require('../controllers/recipes');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.cadastrarReceitas);

router.get('/', controller.buscarReceitas);

router.get('/:id', controller.buscarReceitasID);

module.exports = router;