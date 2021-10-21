const express = require('express');
const path = require('path');

const app = express();

const {
  usersRoutes,
  recipesRoutes,
} = require('../routes');
const { loginControllers } = require('../controllers');
const { error } = require('../middlewares');

app.use(express.json());
app.get('/', (req, res) => { res.send(); });
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);
app.post('/login', loginControllers);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(error);

module.exports = app;
