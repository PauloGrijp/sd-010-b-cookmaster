const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { secret } = require('../services/userService');
const connection = require('./connection');

const modelRecipes = async (recipes, token) => {
  const { name, ingredients, preparation } = recipes;
  const { data: { _id } } = jwt.verify(token, secret); 
  const db = await connection();
  const itemRecipes = await db.collection('recipes').insertOne(
    { userId: _id, name, ingredients, preparation },
);
  return { code: 201,
recipe: {
     _id: itemRecipes.insertedId,
      userId: _id,
      name,
      ingredients,
      preparation,
    } };
};

const ModelAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return { code: 200, allRecipes };
};

const modelListById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return { code: 200, recipe };
};

module.exports = {
  modelRecipes,
  ModelAllRecipes,
  modelListById,
};