const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const registerRecipe = async ({ userId, name, ingredients, preparation }) => {
  const db = await getConnection();

  const recipeCreated = await db.collection('recipes')
    .insertOne({ userId, name, ingredients, preparation });
    
  return recipeCreated.ops[0];
};

const getAll = async () => {
  const db = await getConnection();

  const recipes = await db.collection('recipes').find().toArray();

  return { recipes };
};

const findById = async ({ id }) => {
  const db = await getConnection();

  const recipe = await db.collection('recipes')
    .findOne(new ObjectId(id));

  return { recipe };
};

module.exports = { 
  registerRecipe,
  getAll,
  findById,
};
