const connection = require('./connection');

const RECIPES = 'recipes';

const create = async (recipe, id) => {
  const newRecipe = { ...recipe, userId: id };
  const db = await connection();
  const { insertedId } = await db.collection(RECIPES).insertOne(newRecipe);
  return {
    recipe: {
      ...recipe,
      _id: insertedId,
    },
  };
};

module.exports = {
  create,
};
