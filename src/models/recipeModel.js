// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const create = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const product = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation });
    return { recipe: { name, ingredients, preparation, _id: product.insertedId, userId } };
};

module.exports = {
  create,
  getAllRecipes,
};