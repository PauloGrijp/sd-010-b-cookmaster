const { ObjectID } = require('mongodb');
const mongoConnection = require('./connection');

const createRecipe = async (_id, name, ingredients, preparation) => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const { insertedId: id } = await recipesCollection.insertOne({ 
    name,
    ingredients,
    preparation,
    userId: _id,
  });

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: id,
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

  try {
    const found = await recipesCollection.findOne({ _id: ObjectID(id) });
  
    return found;
  } catch (err) {
     return null;
  }
};

const getAllRecipes = async () => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  const allrecipes = await recipesCollection.find()
  .toArray();

  return allrecipes;
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

const deleteRecipeById = async (id) => {
  const recipesCollection = await mongoConnection.connection()
  .then((db) => db.collection('recipes'));

  try {
    const { deletedCount } = await recipesCollection.deleteOne({ _id: ObjectID(id) });
  
    return deletedCount;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createRecipe,
  findRecipeByName,
  findRecipeById,
  getAllRecipes,
  updateRecipe,
  deleteRecipeById,
};
