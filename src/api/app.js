const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const errorMiddleware = require('../middlewares/errorController');
const { UserController, RecipesController } = require('../controllers');
const auth = require('../middlewares/auth');

const app = express();

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/recipes', auth, RecipesController.create);

app.get('/recipes', RecipesController.getAll);

app.get('/recipes/:id', RecipesController.getOne);

app.put('/recipes/:id', auth, RecipesController.updateOne);

app.delete('/recipes/:id', auth, RecipesController.deleteOne);

app.put('/recipes/:id/image', auth, RecipesController.addImage,
  upload.single('image'), (_req, res, _next) => res.status(200).json(res.response));

app.post('/users', UserController.create);

app.post('/users/admin', auth, UserController.createAdmin);

app.post('/login', UserController.login);

app.use(errorMiddleware);

module.exports = app;
