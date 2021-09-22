const router = require('express').Router();
const LoginController = require('../controllers/loginController');

router.post('/', LoginController.logUser);

module.exports = router;
