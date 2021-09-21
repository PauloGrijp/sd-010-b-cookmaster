// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipeData = async ({ _id, name, ingredients, preparation }) => {
  const { insertedId } = await connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: _id }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: insertedId,
    },
  };
};

const getAllRecipesData = async () => {
  const allRecipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return allRecipes;
};

module.exports = {
  createRecipeData,
  getAllRecipesData,

};
