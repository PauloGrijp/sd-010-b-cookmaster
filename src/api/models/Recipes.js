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

const editRecipeById = async (id, { name, ingredients, preparation }, userId) => {
  try {
    const editedRecipe = await connection()
      .then((db) => db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
      .then(() => ({
          _id: id,
          name,
          ingredients,
          preparation,
          userId,
        }));
    return editedRecipe;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

const deleteRecipeById = async (id) => {
  try {
    const deleteRecipe = await connection()
      .then((db) => db.collection('recipes')
        .deleteOne({ _id: ObjectId(id) }))
        .then(({ deletedCount }) => deletedCount);
    return deleteRecipe;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

const addImageRecipeById = async (id) => {
  try {
    const addedImage = await connection()
      .then((db) => db.collection('recipes')
        .updateOne(
          { _id: ObjectId(id) },
          { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } },
        ))
      .then((result) => (result));
    return addedImage;
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
  editRecipeById,
  deleteRecipeById,
  addImageRecipeById,
};