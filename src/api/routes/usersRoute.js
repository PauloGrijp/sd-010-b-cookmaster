const express = require('express');

const controllersUsers = require('../../controllers/users');
const middlewares = require('../../middlewares/index');

const router = express.Router();

router.post('/', controllersUsers.createUser);

router.post('/admin', middlewares.validateJWT, controllersUsers.createAdmin);

module.exports = router;