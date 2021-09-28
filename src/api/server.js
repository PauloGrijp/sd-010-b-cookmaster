const app = require('./app');

const PORT = 'mongodb://mongodb:27017/Cookmaster';

app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
