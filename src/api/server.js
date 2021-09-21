const app = require('./app');
const usersRouter = require('../Routes/usersRouter');

const PORT = 3000;
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
