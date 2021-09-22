const connection = require('./connection');

const create = async ({ email, name, ingredients, preparation }) => {
  const db = await connection();
  const { id } = await db.collection('users').findOne({ email });
  const result = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation, 
    userId: id,
  });
  return { recipe: result.ops[0] };
};

module.exports = {
  create,
};