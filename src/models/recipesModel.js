const connection = require('./connection');

async function registeringRecipes(name, ingredients, preparation) {
  const newRecipes = await connection()
    .then((db) => db.collection('users').insertOne({ name, ingredients, preparation }));

    return {
      recipe: {
        name,
        ingredients,
        preparation,
        _id: newRecipes.insertedId,
      },
    };
}

module.exports = {
  registeringRecipes,
};
