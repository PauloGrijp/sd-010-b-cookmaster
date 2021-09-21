const app = require('./app');
const middlewareError = require('../middlewares/erro');

const PORT = 3000;

app.use(middlewareError);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
