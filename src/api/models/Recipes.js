const { ObjectId } = require('mongodb');

const connection = require('./connection');

const registerNewRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const addedRecipe = await connection()
      .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
      .then((result) => ({
          _id: result.insertedId,
          name,
          ingredients,
          preparation,
          userId,
      }));
    return addedRecipe;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

const getAllRecipes = async () => {
  try {
    const allRecipes = await connection()
      .then((db) => db.collection('recipes').find().toArray())
      .then((result) => result);
    return allRecipes;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

const getRecipeById = async (id) => {
  try {
    const recipe = await connection()
      .then((db) => db.collection('recipes').findOne(ObjectId(id)))
      .then((result) => (!result ? false : result));
    return recipe;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  registerNewRecipe,
};