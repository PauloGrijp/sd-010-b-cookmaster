const router = require('express').Router();
const UserController = require('../controllers/userController');
const { validateInputs } = require('../middlewares/userMiddlewares');

router.post('/', validateInputs, UserController.create);

module.exports = router;