const express = require('express');

const router = express.Router();
const userController = require('../controllers/userContreoller');

router.post('/', userController.createUser);

module.exports = router;