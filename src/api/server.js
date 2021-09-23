// const express = require('express');
const bodyParser = require('body-parser');
// const { 
//   createUsers, 
//   login, 
//   createRecipes, 
//   allRecipes, 
//   recipeById, 
//   editRecipe,
//   deleteRecipe,
// } = require('./routes');

const PORT = process.env.PORT || 3000;
const app = require('./app');

// const validateJWT = require('./auth/validateJWT');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const apiRoutes = express.Router();

// apiRoutes.post('/users', createUsers)
//         .post('/login', login)
//         .post('/recipes', createRecipes)
//         .get('/recipes', allRecipes)
//         .get('/recipes/:id', recipeById)
//         .put('/recipes/:id', editRecipe)
//         .delete('/recipes/:id', deleteRecipe);

// app.use(apiRoutes);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
