const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
