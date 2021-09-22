const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((result) => result.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((result) => result);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  const getRecipeId = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));  
  
  if (!getRecipeId) return null;
  
  return getRecipeId;
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => 
      db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
      .then(() => ({ _id: id, name, ingredients, preparation })));
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const excludeRecipe = await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  if (!excludeRecipe.deletedCount) return null;

  return excludeRecipe;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};