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
   if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

const getRecipeByAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const editRecipes = async (id, name, ingredients, preparation) => {
// if (!ObjectId.isValid(id)) return null;
const db = await connection();
const result = await db.collection('recipes').findOneAndUpdate(
  { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }, { returnOriginal: false },
);
  // const { userId } = result.value;  {returnDocument: 'after'}
  // return { _id: ObjectId(id), name, ingredients, preparation, userId };
  return result.value;
};

const deleteRecipes = async (id) => {
const db = await connection();
await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addRecipes,
  getRecipeById,
  getRecipeByAll,
  editRecipes,
  deleteRecipes,
};