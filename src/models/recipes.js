const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({
    name, ingredients, preparation,
  });

  return { recipe: { name, ingredients, preparation, userId, _id: insertedId } };
};

const recipes = async () => {
  const db = await connection();

  const listRecipes = await db.collection('recipes').find().toArray();

  console.log(listRecipes);

  return listRecipes;
};

module.exports = {
  createRecipe,
  recipes,
};
