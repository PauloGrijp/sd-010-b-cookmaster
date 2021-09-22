const express = require('express');
const bodyParser = require('body-parser');
const { getPosts, createUsers, login } = require('./routes');

const PORT = process.env.PORT || 3000;
const app = require('./app');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.get('/posts', getPosts);
apiRoutes.post('/users', createUsers);
apiRoutes.post('/login', login);

app.use(apiRoutes);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
