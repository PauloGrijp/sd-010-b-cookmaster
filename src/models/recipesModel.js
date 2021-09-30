const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation }, id) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: id,
      _id: result.insertedId,
    },
  };
};

const getAllRecipes = async () => {
  const result = await connection.getConnection().then((db) =>
    db.collection('recipes').find().toArray());

  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection.getConnection().then((db) =>
    db.collection('recipes').find({ _id: ObjectId(id) }).toArray());

  return result[0];
};

const updateRecipeById = async (id, { name, ingredients, preparation }, userId) => {
  if (!ObjectId.isValid(id)) return null;

  await connection.getConnection().then((db) =>
    db.collection('recipes')
    .update({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const excludeRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  await connection.getConnection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const addRecipeImage = async (id, imageUrl) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection.getConnection().then((db) =>
    db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image: imageUrl } },
      { returnOriginal: false },
    ));

  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  excludeRecipeById,
  addRecipeImage,
 };
