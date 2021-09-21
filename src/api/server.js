const bodyParser = require('body-parser');
const app = require('./app');
const recipesRouter = require('../routers/recipesRouter');
const usersRouter = require('../routers/usersRouter');

app.use(bodyParser.json());

app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
