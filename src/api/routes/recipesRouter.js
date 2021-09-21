const express = require('express');

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controllers/recipesController');
const { validateToken, verifyToken } = require('../middleware/validateUser');

const router = express.Router();

router.route('/').post(validateToken, verifyToken, create).get(getAll);

router
  .route('/:id')
  .get(getById)
  .put(validateToken, verifyToken, update)
  .delete(validateToken, verifyToken, remove);

module.exports = router;
