const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

const createNewRecipe = async (name, ingredients, preparation, userId) => {
  const { ops: recipe } = await connection().then((db) => 
    db.collection(COLLECTION_NAME).insertOne({ name, ingredients, preparation, userId }));
  return { recipe: recipe[0] };
};

module.exports = {
  createNewRecipe,
};