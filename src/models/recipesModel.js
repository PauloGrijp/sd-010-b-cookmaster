const { connection } = require('./connection');

/**
 * 
 * @param {object} recipe informações necessárias da receita 
 * @returns 
 */
const createRecipe = async (recipe, id) => {
  const create = { ...recipe, userId: id };
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(create);
  return {
    ...create,
    _id: newRecipe.insertedId,
  };
};

module.exports = {
  createRecipe,
};
