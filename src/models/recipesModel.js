const { ObjectId } = require('mongodb');
const connectionMongo = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connectionMongo();
  const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { name, ingredients, preparation, userId, _id: recipe.insertedId };
};
 
const getAll = async () => {
  const db = await connectionMongo();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes; 
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  const db = await connectionMongo();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  const { userId } = await getById(id);
  const db = await connectionMongo();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return { _id: ObjectId(id), name, ingredients, preparation, userId };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connectionMongo();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return id;
};

const updateImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await getById(id);
  const db = await connectionMongo();
  const imageUrl = `localhost:3000/src/uploads/${image}`;
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { imageUrl } });
    return { 
      _id: ObjectId(id),
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      userId: recipe.userId,
      image: imageUrl,
    };
};

module.exports = { create, getAll, getById, update, remove, updateImage };
