const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function registeringRecipes(name, ingredients, preparation) {
  const newRecipes = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

    return {
      recipe: {
        name,
        ingredients,
        preparation,
        _id: newRecipes.insertedId,
      },
    };
}

const getAllRecipes = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());

    return allRecipes;
};

const getRecipeId = async (id) => {
  const recipeId = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

    return recipeId;
};

module.exports = {
  registeringRecipes,
  getAllRecipes,
  getRecipeId,
};
