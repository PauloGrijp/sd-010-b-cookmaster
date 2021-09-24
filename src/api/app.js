const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
/* const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs'); */
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
/* const recipesController = require('../controllers/recipeController');
const validateJWT = require('../middlewares/validateJWT'); */
const recipesRouter = require('../controllers/recipeController'); 

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// app.use(express.static(`${__dirname}/uploads`));
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

/* const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    console.log(file);
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    // VALIDAÇÃO AQUI
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
}); */

/* const upload = multer({ storage });
const stream = fs.createReadStream('./padariana.jpeg'); 

const formInfo = new FormData();
formInfo.append('file', stream);
const formHeader = formInfo.getHeaders();  */

app.post('/users', userController.create);
app.post('/login', loginController.login);
app.use('/recipes', recipesRouter);
/* app.post('/recipes', validateJWT, recipesController.create);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', validateJWT, recipesController.update);
app.delete('/recipes/:id', validateJWT, recipesController.exclude);
app.put('/recipes/:id/image/', validateJWT, upload.single('file'), (req, res) => {
  req.headers = formHeader;
  return res.status(200).json({ message: 'Arquivo' });
});
 */
module.exports = app;
