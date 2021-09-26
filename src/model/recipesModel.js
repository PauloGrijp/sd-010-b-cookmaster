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
// Requisito 5: MODEL responsável pela pesquisar receita por ID na BASE DE DADOS, e retorno a receita cadastrada.

const getRecipeByIdModel = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

// ---------------------------------------------------------------
// Requisito 7: MODEL responsável por atualizar receita por ID na BASE DE DADOS, e retorno a receita atualizada.

// Source: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
// +
// Source: https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
const putRecipeByIdModel = async ({ recipeId, name, ingredients, preparation }) => connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(recipeId) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  ))
  .then(({ value }) => value);
// ---------------------------------------------------------------
// Requisito 8: MODEL responsável pela deletar receita por ID na BASE DE DADOS, e retornar a receita deletada.

const delRecipeByIdModel = async (id) => connection()
  .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));

// ---------------------------------------------------------------
// Requisito 8: MODEL responsável pela atualizar o campo imagem da receita por ID na BASE DE DADOS, e retornar a receita atualizada.

const putRecipeImageByIdModel = async ({ recipeId, filename }) => connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(recipeId) },
    { $set: { image: filename } },
    { returnOriginal: false },
  ))
  .then(({ value }) => value);

// ---------------------------------------------------------------

  module.exports = {
    postRecipeModel,
    getRecipesModel,
    getRecipeByIdModel,
    putRecipeByIdModel,
    delRecipeByIdModel,
    putRecipeImageByIdModel,
  };
