const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const createdUser = await db.collection('users')
  .insertOne({ name, ingredients, preparation });

  return { recipe: { name, ingredients, preparation, userId, _id: createdUser.insertedId } };
};

module.exports = { create };