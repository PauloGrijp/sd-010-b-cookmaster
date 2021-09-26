const bodyParser = require('body-parser');
const app = require('./app');
const { createUser } = require('../controllers/users');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.use(bodyParser.json());

app.post('/users', createUser);
