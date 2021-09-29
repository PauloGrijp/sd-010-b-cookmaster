const connect = require('./connection');

const createRecipes = async ({ name, ingredients, preparation }) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('recipes').insertOne(
    { name, ingredients, preparation },
    );
  return { name, ingredients, preparation, id };
};

const getAllRecipes = async () => {
  const db = await connect();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

module.exports = {
  createRecipes,
  getAllRecipes,
};