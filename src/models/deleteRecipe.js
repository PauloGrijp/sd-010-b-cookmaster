const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const deleteRecipe = async (recipeData) => {
  const { id, userId } = recipeData;
  await getConnection()
  .then((db) => db.collection('recipes')
  .deleteOne(
    {
      _id: ObjectId(id),
      userId: ObjectId(userId),
    },
  ))
  .catch(() => false);  
  return true;
};

const deleteRecipeAdmin = async (recipeData) => {
  const { id } = recipeData;
  await getConnection()
  .then((db) => db.collection('recipes')
  .deleteOne({ _id: ObjectId(id) }))
  .catch(() => false);
  return true;
};

module.exports = {
  deleteRecipe,
  deleteRecipeAdmin,
};