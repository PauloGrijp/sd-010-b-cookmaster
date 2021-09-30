const bodyParser = require('body-parser');
const app = require('./app');
const logIn = require('../controllers/login.controllers');
const { newUser } = require('../controllers/user.controllers');
// MIDDLEWARES
const {
  isValidEmail,
  isValidNameAndPassword,
  validateLogin,
} = require('../middlewares/user.middlewares');

app.use(bodyParser.json());

app.post(
  '/users',
  isValidNameAndPassword,
  isValidEmail,
  newUser,
);

app.post(
  '/login',
  validateLogin,
  logIn,
);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
