require('dotenv').config();
const app = require('./app');

const { PORT } = process.env || 3000;

app.listen(PORT, () => console.log(`Online at the port ${PORT}`));
