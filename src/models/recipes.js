const jwt = require('jsonwebtoken');
const connection = require('./connection');

const SECRET = 'secret';

const createRecipe = async (name, ingredients, preparation, authorization) => {
  const { userId } = jwt.verify(authorization, SECRET);

  console.log(name, preparation, ingredients, authorization, 'model');

  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({
    recipe: {
      name, ingredients, preparation,
    },
  });

  return { recipe: { name, ingredients, preparation, userId, _id: insertedId } };
};

const recipes = async () => {
  const db = await connection();

  const listRecipes = await db.collection('recipes').find().toArray();

  return listRecipes;
};

module.exports = {
  createRecipe,
  recipes,
};
