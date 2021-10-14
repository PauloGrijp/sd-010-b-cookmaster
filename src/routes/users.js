const router = require('express').Router();
const { usersController } = require('../controllers');
const { validateJWT } = require('../middlewares');

router.post('/admin', validateJWT, usersController.createAdmin);
router.post('/', usersController.createUser);

module.exports = router;
