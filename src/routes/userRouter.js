const { Router } = require('express');

const userController = require('../controllers/userController');

const router = Router();

router.post('/users', userController.createdUser);

module.exports = router;