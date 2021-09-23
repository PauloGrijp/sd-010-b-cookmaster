const connection = require('./connection');

const registerNewRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const addedRecipe = await connection()
      .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
      .then((result) => ({
          _id: result.insertedId,
          name,
          ingredients,
          preparation,
          userId,
      }));
    return addedRecipe;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

module.exports = {
  registerNewRecipe,
};