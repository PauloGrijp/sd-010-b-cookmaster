const { ObjectId } = require('mongodb');
const connectionMongo = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connectionMongo();
  const recipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return { id: recipe.insertedId, name, ingredients, preparation, userId };
};
 
const getAll = async () => {
  const db = await connectionMongo();
  const recipes = await db.collection('recipes').find().toArray();
  return { recipes }; 
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  const db = await connectionMongo();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

// const update = async (id, name, quantity) => {
//   if (!ObjectId.isValid(id)) return null;
//   const db = await connectionMongo();
//   await db.collection('recipes')
//     .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
//   return { id, name, quantity };
// };

// const remove = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   const db = await connectionMongo();
//   const product = await db.collection('recipes').findOne({ _id: ObjectId(id) });
//   await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
//   return product;
// };

module.exports = { create, getAll, getById };
