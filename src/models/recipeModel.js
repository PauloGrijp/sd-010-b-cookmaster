const connection = require('./connection');

const create = async (name, ingredients, preparation, user) => {
  const db = await connection();
  const recipe = await db.collection('recipe').insertOne({ name, ingredients, preparation, user });
  return { recipe: { name, ingredients, preparation, userId: user, _id: recipe.insertedId } };
};

module.exports = { create };
