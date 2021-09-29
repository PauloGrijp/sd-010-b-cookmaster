const { connection } = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) => {
  const recipeToCreate = { name, ingredients, preparation, userId: id };
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne(recipeToCreate));
  // console.log(newRecipe);
  return {
    name,
    ingredients,
    preparation,
    userId: id,
    _id: newRecipe.insertedId,
  };
};

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipe,
  getAll,
};