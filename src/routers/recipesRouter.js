const express = require('express');
const multer = require('multer');
const controller = require('../controllers/recipes');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.cadastrarReceitas);

router.get('/', controller.buscarReceitas);

router.get('/:id', controller.buscarReceitasID);

router.put('/:id', validateJWT, controller.editarReceita);

router.delete('/:id', validateJWT, controller.deleteReceita);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.put('/:id/image/', upload.single('image'), validateJWT, controller.adicionarImagem);

module.exports = router;