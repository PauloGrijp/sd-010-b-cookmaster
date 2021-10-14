const router = require('express').Router();
const { loginController } = require('../controllers');

router.post('/', loginController.loginUser);

module.exports = router;
