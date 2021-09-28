const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const createdUser = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  return { recipe: { name, ingredients, preparation, userId, _id: createdUser.insertedId } };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

module.exports = { create, getAll };