const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const errorMiddleware = require('../middlewares/error');
const validateJWT = require('./auth/validateJWT');
const User = require('../controllers/User');
const Recipe = require('../controllers/Recipe');
const Login = require('../controllers/Login');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../uploads/`);
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

app.use(bodyParser.json());

app.post('/login', Login);

app.post('/users', User.create);

app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.findById);
app.put('/recipes/:id', validateJWT, Recipe.update);
// app.put('/recipes/:id/image', validateJWT, upload.single('image'), (req, res) => {
//   console.log(req.file);
//   return res.status(200).json({ body: req.body, file: req.file });
// });
app.put('/recipes/:id/image', validateJWT, upload.single('image'), Recipe.update);
app.post('/recipes', validateJWT, Recipe.create);
app.delete('/recipes/:id', validateJWT, Recipe.remove);

app.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
