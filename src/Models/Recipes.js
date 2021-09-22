const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const newRecipe = async (name, ingredients, preparation, userId) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);

const updateRecipe = async (id, name, ingredients, preparation) => 
  connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ))
    .then((result) => result.value);

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  newRecipe,
  updateRecipe,
  deleteRecipe,
};
