const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = require('./app');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
