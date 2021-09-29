const { connection } = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

  return {
    name,
    ingredients,
    preparation,
    id: newRecipe.insertedId,
  };
};

module.exports = {
  createRecipe,
};