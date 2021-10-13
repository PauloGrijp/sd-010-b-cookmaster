const connection = require('./connection');

async function registeringRecipes(name, ingredients, preparation) {
  const newRecipes = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

    return {
      recipe: {
        name,
        ingredients,
        preparation,
        _id: newRecipes.insertedId,
      },
    };
}

const getAllRecipes = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());

    return allRecipes;
};

module.exports = {
  registeringRecipes,
  getAllRecipes,
};
