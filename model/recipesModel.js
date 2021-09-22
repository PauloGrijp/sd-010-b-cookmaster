const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const add = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return add.ops[0];
};

const findRecipes = async () => {
  const find = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return find;
};

const findById = async (id) => ObjectId.isValid(id)
  && connection().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const updateRecipe = async (id, name, ingredients, preparation) => {
  const update = await connection().then((db) =>
    db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  return update;
};

const deleteRecipe = async (id) => ObjectId.isValid(id)
  && connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  addRecipe,
  findRecipes,
  updateRecipe,
  deleteRecipe,
  findById,
};