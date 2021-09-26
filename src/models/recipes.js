const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, user) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: user
  });

  return { recipe: { name, ingredients, preparation, userId: user, _id: recipe.insertedId } };
};

const getAll = async () => {
  const db = await connection();

  return db.collection('recipes').find({}).toArray();
};

const getOne = async (id) => {
  const db = await connection();
  
  return db.collection('recipes').findOne({ _id: ObjectId(id) });
};

module.exports = { create, getAll, getOne };
