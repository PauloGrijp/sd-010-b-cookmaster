const connection = require('./connection');

const createRecipe = async (data) => {
  const db = await connection();
  const response = await db.collection('recipes').insertOne(data);
  const recipe = { ...response.ops[0] };

  return { recipe };
};

module.exports = {
  createRecipe,
}; 