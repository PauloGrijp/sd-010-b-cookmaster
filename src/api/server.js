const bodyParser = require('body-parser');
const app = require('./app');
const userMiddlewares = require('../../middlewares/userMiddleware');
const userController = require('../../controllers/userController');
const login = require('../../controllers/login');

app.use(bodyParser.json());

app.post(
  '/users',
  userMiddlewares.validateNameAndPassword,
  userMiddlewares.validateEmail,
  userController.createUser,
);

app.post(
  '/login',
  userMiddlewares.validateLogin,
  login,
);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
