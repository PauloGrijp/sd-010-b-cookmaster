const express = require('express');
const validadeJWT = require('../auth/validateJWT');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.post('/admin', validadeJWT, userController.createAdmin);

module.exports = router;