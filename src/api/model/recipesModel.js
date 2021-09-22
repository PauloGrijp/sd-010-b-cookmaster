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

const getAllRecipes = async () => {
  const Cookmaster = await connection();
  const recipes = await Cookmaster.collection('recipes');

  const result = await recipes.find().toArray();
  return result;
};

module.exports = {
  createRecipes,
  getAllRecipes,
};
