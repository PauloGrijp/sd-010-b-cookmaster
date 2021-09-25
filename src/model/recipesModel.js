const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createRecipeM = async (name, ingredients, preparation, userId) => 
  getConnection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);
const getAllRecipesM = async () => 
  getConnection()
    .then((db) => db.collection('recipes').find().toArray());
const getRecipeIdM = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getConnection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};
const updateRecipeM = async (id, name, ingredients, preparation) => 
  getConnection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ))
    .then((result) => result.value);
const deleteRecipeM = async (id) => 
  getConnection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
const uploadImgRecipeM = async (id, imagePath) => 
  getConnection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { image: imagePath } },
        { returnOriginal: false },
      ))
      .then((result) => result.value);

module.exports = {
  getAllRecipesM,
  getRecipeIdM,
  createRecipeM,
  updateRecipeM,
  deleteRecipeM,
  uploadImgRecipeM,
};
