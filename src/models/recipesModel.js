const connection = require('./connection');

const registerNewRecipe = async (recipe, userInfo) => {
  const { _id } = userInfo;
  const newRecipe = { ...recipe, userId: _id };
  const db = await connection.getConnection();
  const registeredRecipe = await db.collection('recipes').insertOne(newRecipe);

  return { recipe: { _id: registeredRecipe.insertedId, ...newRecipe } };
};

module.exports = {
  registerNewRecipe,
};

// { 
//   "name" : "Receita do Jacquin",
//   "ingredients" : "Frango",
//   "preparation" : "10 minutos no forno" 
//   "userId" : "token"
// }
