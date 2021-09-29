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

module.exports = { createRecipe, getAllRecipes, getRecipeById };
