const bodyParser = require('body-parser');
const app = require('./app');
const { isValidEmail, isValidNameAndPassword } = require('../middlewares/user.middlewares');
const { newUser } = require('../controllers/user.controllers');

app.use(bodyParser.json());

app.post(
  '/users',
  isValidNameAndPassword,
  isValidEmail,
  newUser,
);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
