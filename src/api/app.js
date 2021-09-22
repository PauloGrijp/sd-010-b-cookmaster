const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const Middlewares = require('../middlewares');
const Controllers = require('../controllers');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(
  cors({
    origin: `http://localhost:${3000}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, `${__dirname}/../uploads`);
  },

  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg') {
    req.fileValidationError = true;

    return cb(null, false);
  }

  return cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});

app.post('/users', Controllers.user.create);
app.post('/login', Controllers.user.login);
app.use(Middlewares.userError);

app.post('/users/admin', validateJWT, Controllers.admin.create);
app.use(Middlewares.adminError);

app.get('/recipes', Controllers.recipe.listRecipes);
app.get('/recipes/:id', Controllers.recipe.findRecipe);
app.post('/recipes', validateJWT, Controllers.recipe.create);
app.put('/recipes/:id', validateJWT, Controllers.recipe.edit);
app.delete('/recipes/:id', validateJWT, Controllers.recipe.exclude);
app.put(
  '/recipes/:id/image/',
  validateJWT,
  upload.single('image'),
  Controllers.recipe.addImage,
);
app.use(Middlewares.recipeError);

app.get('/images/:id.jpeg', Controllers.image.find);

module.exports = app;
