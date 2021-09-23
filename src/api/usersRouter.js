const router = require('express').Router();

const validateToken = require('../middlewares/tokenValidation');
const userController = require('../controllers/user');

router.post('/users/admin', validateToken, userController.createAdminUser);
router.post('/users', userController.createUser);
router.post('/login', userController.login);

module.exports = router;