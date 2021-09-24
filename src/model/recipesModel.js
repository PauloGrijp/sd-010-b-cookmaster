const { ObjectId } = require('mongodb'); 
const { connection } = require('./connection');

// ---------------------------------------------------------------
// Requisito 3: MODEL responsável pelo cadastro de receitas na BASE DE DADOS, e retorno da receita cadastrada.

const postRecipeModel = async ({ name, ingredients, preparation, userId }) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((recipe) => ({ name, ingredients, preparation, userId, _id: ObjectId(recipe.insertedId) }));

// ---------------------------------------------------------------
  
  module.exports = {
    postRecipeModel,
  };
