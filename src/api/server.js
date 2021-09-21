const app = require('./app');
const usersRouter = require('../Routes/usersRouter');
const loginRouter = require('../Routes/loginRouter');
const recipesRouter = require('../Routes/recipesRouter');

const PORT = 3000;
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
