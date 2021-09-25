const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipeModel = async (recipe, userId) => {
  const DB = await connection();
  const recipeDB = await DB.collection('recipes').insertOne({ ...recipe, userId });
  return { recipe: recipeDB.ops[0] };
};

const getRecipesModel = async () => connection()
  .then((DB) => DB.collection('recipes').find().toArray());

  const getRecipesIDModel = async (id) => {
    if (!ObjectId.isValid(id)) { return null; }
    const DB = await connection();
    return DB.collection('recipes').findOne(new ObjectId(id));
  };

module.exports = {
  createRecipeModel,
  getRecipesModel,
  getRecipesIDModel,
};