const connection = require('./connection');

const createRecipes = async (aoba) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('recipes').insertOne({ aoba });
  return result;
};

module.exports = createRecipes;
