const express = require('express');

const {
  create,
  getAll,

} = require('../controllers/recipesController');
const { validateToken, verifyToken } = require('../middleware/validateUser');

const router = express.Router();

router.route('/').post(validateToken, verifyToken, create).get(getAll);

module.exports = router;
