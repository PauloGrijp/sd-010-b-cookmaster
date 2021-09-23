const express = require('express');
const controller = require('../controllers/recipes');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.cadastrarReceitas);

router.get('/', controller.buscarReceitas);

module.exports = router;