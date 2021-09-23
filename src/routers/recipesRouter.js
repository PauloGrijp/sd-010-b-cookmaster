const express = require('express');
const controller = require('../controllers/recipes');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.receitas);

module.exports = router;