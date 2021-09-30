const express = require('express');
const app = require('./app');
const usersRouter = require('../Routes/usersRouter');
const loginRouter = require('../Routes/loginRouter');
const recipesRouter = require('../Routes/recipesRouter');

const PORT = 3000;
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(`${__dirname}/../uploads`));

app.listen(PORT, () => console.log(`running on port ${PORT}`));
