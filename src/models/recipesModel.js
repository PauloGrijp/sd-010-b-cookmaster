const { ObjectID } = require('mongodb');
const mongoConnection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const { insertedId: id } = await recipesCollection.insertOne({ 
    name,
    ingredients,
    preparation,
    userId: ObjectID(userId),
  });

  return {
    recipe: {
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
};

const findRecipeByName = async (name) => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const found = await recipesCollection.findOne({ name });

  if (found) return found;
};

const findRecipeById = async (id) => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const found = await recipesCollection.findOne({ _id: ObjectID(id) });

  return found;
};

const getAllRecipes = async () => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const allrecipes = await recipesCollection.find()
  .toArray();

  return {
    recipes: allrecipes,
  };
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const { modifiedCount } = await recipesCollection.updateOne(
    { _id: ObjectID(id) },
    {
      $set: {
        name,
        ingredients,
        preparation,
      },
    },
  );
  
  return modifiedCount;
};

const deleteRecipe = async (id) => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const { deletedCount } = await recipesCollection.deleteOne({ _id: ObjectID(id) });

  return deletedCount;
};

module.exports = {
  createRecipe,
  findRecipeByName,
  findRecipeById,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
};
