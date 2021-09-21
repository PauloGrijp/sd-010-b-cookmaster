const express = require('express');

// const path = require('path');
const multer = require('multer');

const {
  create,
  getAll,
  getById,
  update,
  remove,
  addFile,
} = require('../controllers/recipesController');
const { validateToken, verifyToken } = require('../middleware/validateUser');

const router = express.Router();

router.route('/').post(validateToken, verifyToken, create).get(getAll);

router
  .route('/:id')
  .get(getById)
  .put(validateToken, verifyToken, update)
  .delete(validateToken, verifyToken, remove);

  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, 'src/uploads/');
    },
    filename: (req, _file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
    },
  });

const upload = multer({ storage });

router.route('/:id/image').put(validateToken, verifyToken, upload.single('image'), addFile);

module.exports = router;
