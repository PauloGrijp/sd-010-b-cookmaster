const connection = require('./mongoConnection');

const COLLECTION = 'recipes';

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const createRecipe = await db.collection(COLLECTION)
    .insertOne({ name, ingredients, preparation, userId });
  
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: createRecipe.insertedId,
  };
};

module.exports = {
  create,
};