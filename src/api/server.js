const bodyParser = require('body-parser'); // extrair info do body
const app = require('./app');

const { error, validate } = require('../middlewares');
const { userController } = require('../controllers');

app.use(bodyParser.json());

// rotas
app.post('/users', validate.createUser, userController.createUser);

app.use(error);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
