const express = require('express');
const { checkValues } = require('../../middlewares/usersMiddlewares');
const usersController = require('../../controllers/usersController');

const router = express.Router();

router.post('/', checkValues, usersController.addUser);

module.exports = router;
