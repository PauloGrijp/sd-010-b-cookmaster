const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await getConnection()
    .then((db) => db.collection('recipes').insertOne({
      name, ingredients, preparation, userId,
    }))
    .then((response) => response.ops[0]);

  return recipe;
};

const getRecipes = async () => {
  const recipes = await getConnection()
    .then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await getConnection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return recipe;
};

const editRecipe = async (name, ingredients, preparation, ids) => {
  const { recipeId, userId } = ids;

  await getConnection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
    ));

  const recipe = {
    _id: recipeId,
    name,
    ingredients,
    preparation,
    userId,
  };

  return recipe;
};

const deleteRecipe = async (recipeId) => {
  await getConnection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(recipeId) }));

  return null;
};

const uploadImage = async (id, path) => {
  await getConnection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { image: path } },
    ));

  const recipe = await getRecipeById(id);

  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
};
