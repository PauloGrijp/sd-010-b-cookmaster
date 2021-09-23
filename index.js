const express = require('express');
const users = require('./1Routes/users');

const app = express();

const PORT = 3000;

app.use('/users', users);

app.listen(PORT, () => console.log('Online'));
