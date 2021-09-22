const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async ({ body, userId }) => {
  const Cookmaster = await connection();
  const recipes = await Cookmaster.collection('recipes');

  const { name, ingredients, preparation } = body;

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

const getByIdRecipes = async (id) => {
  const Cookmaster = await connection();
  const recipes = await Cookmaster.collection('recipes');

  const query = { _id: ObjectId(id) };

  const result = await recipes.findOne(query);
  return result;
};

const updateByIdRecipes = async (recipeId, userId, body) => {
  const Cookmaster = await connection();
  const recipes = await Cookmaster.collection('recipes');

  const { name, ingredients, preparation } = body;

  const findQuery = { _id: ObjectId(recipeId) };
  const updateQuery = { $set: { name, ingredients, preparation } };

  await recipes.findOneAndUpdate(findQuery, updateQuery);

  const result = await getByIdRecipes(recipeId);
  return result;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByIdRecipes,
  updateByIdRecipes,
};
