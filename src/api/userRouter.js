const router = require('express').Router();

const userController = require('../controllers/user');

router.post('/users', userController.createUser);
// router.post('/login')

module.exports = router;