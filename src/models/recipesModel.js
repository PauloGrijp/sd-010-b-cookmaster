const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const create = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  console.log(create.ops[0]);
  const recipe = create.ops[0];
  return { recipe };
};

module.exports = { createRecipe };