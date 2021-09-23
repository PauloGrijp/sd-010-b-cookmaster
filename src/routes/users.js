const express = require('express');
const validateJWT = require('../auth/validateJWT');
const { create, createAdmin } = require('../controllers/usersController');

const router = express.Router();

router.post('/admin', validateJWT, createAdmin);
router.post('/', create);

module.exports = router;
