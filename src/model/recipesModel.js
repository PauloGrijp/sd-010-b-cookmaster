const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createRecipesM = async (name, ingredients, preparation, userId) => 
  getConnection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);
const getAllRecipesM = async () =>
  getConnection()
    .then((db) => db.collection('recipes').find().toArray());
const getIdRecipesM = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getConnection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};
const updateRecipesM = async (id, name, ingredients, preparation) => 
  getConnection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ))
    .then((result) => result.value);
const deleteRecipesM = async (id) => 
  getConnection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllRecipesM,
  getIdRecipesM,
  createRecipesM,
  updateRecipesM,
  deleteRecipesM,
};
