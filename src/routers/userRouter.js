const express = require('express');

const controller = require('../controllers/userController');

const router = express.Router();

const { authUser } = require('../middlewares');

router.use(authUser.requiredField);

router.post('/', controller.createUser);

module.exports = router;
