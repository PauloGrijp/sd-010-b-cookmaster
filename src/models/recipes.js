const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne(
    {
      recipe: {
        name,
        ingredients,
        preparation,
        userId: 'x',
      },
    },
  );

  return { recipe: name, ingredients, preparation };
};

module.exports = {
  createRecipe,
};
