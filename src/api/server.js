const bodyParser = require('body-parser');
const { validateUserName,
  validateEmail,
  validatePassword,
  createUser,
  validateUserLogin,
  checkUserExists,
} = require('../controllers/userController');
const app = require('./app');

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users', validateUserName, validateEmail, validatePassword, createUser);

app.post('/login', validateUserLogin, checkUserExists);
