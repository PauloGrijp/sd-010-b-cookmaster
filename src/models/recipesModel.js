const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const create = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const recipe = create.ops[0];
  return { recipe };
};

const getRecipesAll = async () => {
  const db = await connection();
  const getAll = await db.collection('recipes').find({}).toArray();
  return getAll;
};

const getRecipesId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const getRecipe = await db.collection('recipes').findOne(new ObjectId(id));
  return getRecipe;
};

const updateRecipe = async (id, body, user) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const { name, ingredients, preparation } = body;
  const { _id, role } = user;
  const db = await connection();
  const { value } = await db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );
    if (_id === value.userId || role === 'admin') {
      return value;
    }
    return {};
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
 const deleteData = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
 return deleteData;
};

const updateImage = async (id, image) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const { value } = await db.collection('recipes').findOneAndUpdate({ _id: ObjectId(id) },
  { $set: { image } },
  { returnOriginal: false });
  return value;
};
module.exports = {
  createRecipe,
  getRecipesAll,
  getRecipesId,
  updateRecipe,
  deleteRecipe,
  updateImage };
