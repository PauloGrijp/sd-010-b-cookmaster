const express = require('express');
const usersController = require('../Controller/usersController');
const { validateToken } = require('../midlewares/validateToken');

const router = express.Router();
router.get('/', usersController.getAll);
router.post('/', usersController.createUser);
router.post('/admin', validateToken, usersController.createUserAdmin);

module.exports = router;