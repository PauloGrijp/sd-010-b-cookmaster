const { connection } = require('./connection');

const create = async (recipe, id) => {
  const { insertedId, ops } = await connection()
  .then((db) => db.collection('recipes').insertOne({ ...recipe, userId: id }));

  return { recipe: { ...ops[0], _id: insertedId } };
};

const getAll = async () => connection()
.then((db) => db.collection('recipes').find().toArray());

module.exports = {
  create,
  getAll,
};