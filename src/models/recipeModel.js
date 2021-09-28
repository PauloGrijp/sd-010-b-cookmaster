// const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const registerRecipe = async ({ name, ingredients, preparation }) => {
  const dbConnection = await connection().then((db) => db.collection('recipes'));
  const { insertedId: id } = await dbConnection.insertOne(
    { name, ingredients, preparation },
  );
  // console.log(recipe);

  return { name, ingredients, preparation, id };
};

module.exports = {
  registerRecipe,
};
