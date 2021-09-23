const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipeController');
const validateJWT = require('../middlewares/validateJWT');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyparser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    console.log(file);
    callback(null, 'uploads');
  },
  filename: (_req, file, callback) => 
    // VALIDAÇÃO AQUI
    callback(null, `${file.originalname}`),
  
});
const upload = multer({ storage });
const stream = fs.createReadStream('./meu-arquivo.txt');

const formInfo = new FormData();
formInfo.append('file', stream);
const formHeader = formInfo.getHeaders();

app.post('/users', userController.create);
app.post('/login', loginController.login);
app.post('/recipes', validateJWT, recipesController.create);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', validateJWT, recipesController.update);
app.delete('/recipes/:id', validateJWT, recipesController.exclude);
app.put('/recipes/:id/image/', validateJWT, formInfo, upload.single('file'), (req, res) => 
  // const { id } = req.params;
   res.status(201).json({ message: 'Arquivo' }));

module.exports = app;
