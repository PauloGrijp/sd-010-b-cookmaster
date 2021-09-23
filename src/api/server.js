const express = require('express');
const app = require('./app');
const usersRouter = require('../Routes/usersRouter');
const loginRouter = require('../Routes/loginRouter');
const recipesRouter = require('../Routes/recipesRouter');

const PORT = 3000;
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
// https://github.com/tryber/sd-10b-live-lectures/blob/lecture/28.2/codigo/api/index.js
app.use('/images', express.static(`${__dirname}/../uploads`));

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
