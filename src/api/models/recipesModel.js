const { ObjectId } = require('mongodb');
const connection = require('./mongoConnections');

const addRecipes = async (user, name, ingredients, preparation) => {
  const db = await connection();
  const { _id } = user;
  const result = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId: _id,
  });
  return { recipe: result.ops[0] };
};

const getRecipeById = async (id) => {
  if (!ObjectId.isvalid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

const getRecipeByAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

module.exports = {
  addRecipes,
  getRecipeById,
  getRecipeByAll,
};