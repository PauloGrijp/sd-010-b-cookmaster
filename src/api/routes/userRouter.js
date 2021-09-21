const express = require('express');

const { create, createAdmin } = require('../controllers/userController');
const {
  validateToken, verifyToken,
  validateUserData,

} = require('../middleware/validateUser');

const router = express.Router();

router.route('/').post(validateUserData, create);
router.route('/admin').post(validateToken, verifyToken, createAdmin);

module.exports = router;
