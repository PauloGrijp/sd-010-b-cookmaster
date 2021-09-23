const jwt = require('jsonwebtoken');
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

module.exports = {
  modelRecipes,
};