const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const editRecipe = async (recipeData) => {
  const { name, ingredients, preparation, id, userId } = recipeData;
  await getConnection()
  .then((db) => db.collection('recipes')
  .updateOne(
    {
      _id: ObjectId(id),
      userId: ObjectId(userId),
    },
    { 
      $set: { name, ingredients, preparation },
    },
  ))
  .catch(() => false);  
  return { _id: id, name, ingredients, preparation, userId };
};

const editRecipeAdmin = async (recipeData) => {
  const { name, ingredients, preparation, id, userId } = recipeData;
  await getConnection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
  .catch(() => false);
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  editRecipe,
  editRecipeAdmin,
};