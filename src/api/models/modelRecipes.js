const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) => {
  const recipeToCreate = { name, ingredients, preparation, userId: id };
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne(recipeToCreate));
  // console.log(newRecipe);
  return {
    name,
    ingredients,
    preparation,
    userId: id,
    _id: newRecipe.insertedId,
  };
};

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  // console.log(id);
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeById = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  // console.log(recipeById);

  return recipeById;
};

module.exports = {
  createRecipe,
  getAll,
  getRecipeById,
};