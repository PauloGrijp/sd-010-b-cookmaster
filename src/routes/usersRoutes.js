const express = require('express');
const { usersControllers } = require('../controllers');
const {
  validateAdmin,
  validateJWT,
} = require('../middlewares');

const router = express.Router();

router.post('/admin', validateJWT, validateAdmin, usersControllers.createAdmin);
router.post('/', usersControllers.create);

module.exports = router;
