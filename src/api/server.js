const bodyParser = require('body-parser');
const app = require('./app');
const signUpMiddleware = require('../middlewares/signUpMiddleware');
const userController = require('../controllers/userController');

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users',
signUpMiddleware.validateName,
signUpMiddleware.validateEmail,
signUpMiddleware.validatePassword,
userController.signUp);