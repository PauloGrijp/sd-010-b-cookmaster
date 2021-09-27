const bodyParser = require('body-parser');
const app = require('./app');
const usersRouter = require('./Router/usersRouter');
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
