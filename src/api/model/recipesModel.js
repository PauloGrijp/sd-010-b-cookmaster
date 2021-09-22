const connection = require('./connection');

const createRecipes = async ({ name, ingredients, preparation, userId }) => {
  const Cookmaster = await connection();
  const recipes = await Cookmaster.collection('recipes');

  const { insertedId: _id } = await recipes.insertOne({ name, ingredients, preparation, userId });

  return {
    _id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

module.exports = {
  createRecipes,
};
