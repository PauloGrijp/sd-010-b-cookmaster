const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipesModel = async (name, ingredients, preparation) => {
  const db = await connect();
  const result = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return result;
};

const getAllRecipes = async () => {
  const db = await connect();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  return result;
};

const editeRecipesById = async (id, body) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: body });
  return getRecipesById(id);
};

const deleteRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const createImage = async (id) => {
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  const user = await getRecipesById(id);
  const updates = {
    ...user,
    image,
  };

  const db = await connect();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: updates });
  return updates;
};

module.exports = {
  createRecipesModel,
  getAllRecipes,
  getRecipesById,
  editeRecipesById,
  deleteRecipesById,
  createImage,
};
