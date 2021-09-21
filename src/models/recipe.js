const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (recipe) => {
  const db = await connection();
  const recipeAdd = await db.collection('recipes').insertOne(recipe);

  return recipeAdd.ops[0];
};

const listRecipes = async () => {
  const db = await connection();
  const recipeList = await db.collection('recipes').find().toArray();

  return recipeList;
};

const findRecipe = async (id) => {
  const db = await connection();
  const recipeFound = await db.collection('recipes').findOne(ObjectId(id));

  return recipeFound;
};

const edit = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;
  const db = await connection();
  await db
  .collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const recipeEdited = await findRecipe(id);
  
  return recipeEdited;
};

const exclude = async (id) => {
  const db = await connection();
  const recipeEdited = await findRecipe(id);
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  
  return recipeEdited;
};

module.exports = { create, listRecipes, findRecipe, edit, exclude };
