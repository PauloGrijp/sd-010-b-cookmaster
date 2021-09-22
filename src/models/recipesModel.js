const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const recipes = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation });
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipes.insertedId,
  },
  };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes')
  .find()
  .toArray();
  return recipes;
};

const getOneRecipes = async (id) => {
  if (!ObjectId.isValid(id)) return null;
const db = await getConnection();
const oneRecipe = await db.collection('recipes')
.findOne({ _id: ObjectId(id) });
return oneRecipe;
};

module.exports = {
   registerRecipes,
   getAllRecipes,
   getOneRecipes,
};