const bodyParser = require('body-parser');
const app = require('./app');
const userMiddlewares = require('../../middlewares/userMiddleware');
const userController = require('../../controllers/userController');

app.use(bodyParser.json());

app.post(
  '/users',
  userMiddlewares.validateNameAndPassword,
  userMiddlewares.validateEmail,
  userController.createUser,
);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
