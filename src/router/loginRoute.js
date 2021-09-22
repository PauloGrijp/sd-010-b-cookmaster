const router = require('express').Router();
const LoginController = require('../controllers/loginController');
const { validateInputs } = require('../middlewares/loginMiddleware');

router.post('/', validateInputs, LoginController.logUser);

module.exports = router;
