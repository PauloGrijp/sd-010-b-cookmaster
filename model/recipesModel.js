const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const add = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return add.ops[0];
};

const findRecipes = async () => {
  const find = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return find;
};

module.exports = {
  addRecipe,
  findRecipes,
};