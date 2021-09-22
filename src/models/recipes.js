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

module.exports = {
  createRecipe,
  getRecipes,
};
