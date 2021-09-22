const express = require('express');
const bodyParser = require('body-parser');
const { getPosts, createUsers, login, createRecipes } = require('./routes');

const PORT = process.env.PORT || 3000;
const app = require('./app');

const validateJWT = require('./auth/validateJWT');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.get('/posts', getPosts)
        .post('/users', createUsers)
        .post('/login', login)
        .post('/recipes', validateJWT, createRecipes);

// app.use(apiRoutes);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
