const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection.getConnection();
  const newRecipe = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: newRecipe.ops[0] };
};

const getAll = async () => {
  const db = await connection.getConnection();
  const result = await db.collection('recipes').find().toArray();

  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  const recipeId = await db.collection('recipes').findOne(new ObjectId(id));

  return recipeId;
};

const update = async (id, userId, { name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection.getConnection();  

  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return {
    _id: id,
    userId,
    name,
    ingredients,
    preparation,    
  };  
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  const result = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });

  return result;
};

const upLoad = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } });

  const recipeId = await db.collection('recipes').findOne(new ObjectId(id));

  return recipeId; 
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
  upLoad,
};
