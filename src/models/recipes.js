const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await getConnection()
    .then((db) => db.collection('recipes').insertOne({
      name, ingredients, preparation, userId,
    }))
    .then((response) => response.ops[0]);

  return recipe;
};

const getRecipes = async () => {
  const recipes = await getConnection()
    .then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

const getRecipeById = async (id) => {
  console.log('model 1', id);
  const recipe = await getConnection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  console.log('model 2', recipe);
  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};
