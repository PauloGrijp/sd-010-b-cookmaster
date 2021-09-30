const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (recipeData) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeData }));

const getAllRecipes = () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
};

const updateRecipe = async (recipeData) => {
  const { _id, name, ingredients, preparation } = recipeData;
  return connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(_id) },
      { $set: {
        name,
        ingredients,
        preparation,
      } },
    ));
};

const deleteRecipe = async (id) => 
  connection()
    .then((db) => db.collection('recipes').deleteOne(
      { _id: ObjectId(id) },
    ));

const uploadImage = async (imageData) => {
  const { _id, imagePath } = imageData;
  return connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(_id) },
      { $set: {
        image: imagePath,
      } },
    ));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};