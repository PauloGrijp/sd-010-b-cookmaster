const express = require('express');
const usersController = require('../Controller/usersController');

const router = express.Router();
router.get('/', usersController.getAll);
router.post('/', usersController.createUser);

module.exports = router;