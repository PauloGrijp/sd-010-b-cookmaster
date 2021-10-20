const connection = require('./connection');

const create = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const product = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    return { recipe: { name, ingredients, preparation, _id: product.insertedId, userId } };
};

module.exports = {
  create,
};
