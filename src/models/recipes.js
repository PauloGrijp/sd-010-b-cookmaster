const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({
    name, ingredients, preparation,
  });

  return { recipe: { name, ingredients, preparation, userId, _id: insertedId } };
};

const recipes = async () => {
  const db = await connection();

  const listRecipes = await db.collection('recipes').find().toArray();

  return listRecipes;
};

const uniquiRecipe = async (id) => {
  const db = await connection();

  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
};

module.exports = {
  createRecipe,
  recipes,
  uniquiRecipe,
};
