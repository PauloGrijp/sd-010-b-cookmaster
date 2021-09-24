const { ObjectId } = require('mongodb'); 
const { connection } = require('./connection');

// ---------------------------------------------------------------
// Requisito 3: MODEL responsável pelo cadastro de receitas na BASE DE DADOS, e retorno da receita cadastrada.

const postRecipeModel = async ({ name, ingredients, preparation, userId }) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((recipe) => ({ name, ingredients, preparation, userId, _id: ObjectId(recipe.insertedId) }));

// ---------------------------------------------------------------
// Requisito 4: MODEL responsável pela listagem de receitas da BASE DE DADOS, e retorno dad receitas cadastradas.

const getRecipesModel = async () => connection()
  .then((db) => db.collection('recipes').find({}).toArray())
  .then((recipes) => recipes);

// ---------------------------------------------------------------
  
  module.exports = {
    postRecipeModel,
    getRecipesModel,
  };
