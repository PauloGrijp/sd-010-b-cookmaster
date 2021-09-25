const { Router } = require('express');
const userController = require('../controller/userController');

const router = Router();

router.post('/users', userController.create);

module.exports = router;