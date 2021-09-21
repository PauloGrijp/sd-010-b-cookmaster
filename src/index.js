const express = require('express');

const userRoutes = require('./routes/usuarios.routes');
const recipesRoutes = require('./routes/recipes.routes');

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(recipesRoutes);

// https://expressjs.com/pt-br/starter/static-files.html  
app.use('/images', express.static(`${__dirname}/../uploads`));

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});