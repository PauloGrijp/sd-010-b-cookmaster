const bodyParser = require('body-parser');
const app = require('./app');
const { createUser } = require('../controllers/userController');
const { login } = require('../controllers/login');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.use(bodyParser.json());

app.post('/users', createUser);
app.post('/login', login);
