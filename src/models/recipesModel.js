const connection = require('./connection');

const create = async ({ email, name, ingredients, preparation }) => {
  const db = await connection();
  const { _id } = await db.collection('users').findOne({ email });
  const result = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation, 
    userId: _id,
  });
  return { recipe: result.ops[0] };
};

const getRecipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  // console.log(result);
  return result;
};

module.exports = {
  create,
  getRecipes,
};