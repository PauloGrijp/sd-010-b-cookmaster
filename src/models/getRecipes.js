const { getConnection } = require('./connection');

const getRecipes = () => getConnection()
  .then((db) => db.collection('recipes')
  .find()
  .toArray());

module.exports = getRecipes;