// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  console.log(userId);
  const db = await connection();
  const product = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation });
    return { recipe: { name, ingredients, preparation, _id: product.insertedId, userId } };
};

module.exports = {
  create,
};