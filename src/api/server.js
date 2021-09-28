const app = require('./app');

const PORT = 'mongodb://localhost:27017/Cookmaster';

app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
