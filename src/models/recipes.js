const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { secret } = require('../services/userService');
const connection = require('./connection');

const modelUpdater = async ({ id, name, ingredients, preparation }, token) => {
  const { data: { _id } } = jwt.verify(token, secret); 
  const db = await connection();
  await db.collection('recipes').updateOne({
     _id: new ObjectId(id),
    },
     {
       $set: { userId: _id,
              name,
              ingredients,
              preparation } });
  return { code: 200,
     recipe: { _id: id,
     name,
     ingredients,
     preparation,
     userId: _id } };
};

const modelEraser = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const products = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
  return { code: 200, prod: products };  
};

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
  modelUpdater,
  modelEraser,
  modelRecipes,
  ModelAllRecipes,
  modelListById,
};