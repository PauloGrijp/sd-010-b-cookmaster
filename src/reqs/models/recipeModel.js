const { ObjectID } = require('mongodb');
const { getConnection } = require('../connection/connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const recipeOk = { recipe: { name, ingredients, preparation, userId, _id } };
  return recipeOk;
};

const getRecipes = async () => {
  const db = await getConnection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getOneRecipes = async (recipeId) => {
  const db = await getConnection();
  const result = await db.collection('recipes').findOne(ObjectID(recipeId));
  console.log(result);
  return result;
};

const updRecipeModel = async (recipeId, item, userId) => {
  const { name, ingredients, preparation } = item;
  const db = await getConnection();
  await db.collection('recipes').updateOne(
    { _id: ObjectID(recipeId) }, { $set: item },
    );
    const edited = {
      _id: recipeId,
      name,
      ingredients,
      preparation,
      userId,
    };
  return edited;
};

module.exports = { insertRecipe, getRecipes, getOneRecipes, updRecipeModel };
