const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createRecipe = async ({ userId, name, ingredients, preparation }) => {
  const db = await getConnection();

  const createReciped = await db
  .collection('recipes')
  .insertOne({ userId, name, ingredients, preparation });
  return createReciped.ops[0];
};

const getAll = async () => {
  const db = await getConnection();

  const recipes = await db.collection('recipes').find().toArray();

  return { recipes };
};

const findById = async ({ id }) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne(new ObjectId(id));
  return { recipe };
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const db = await getConnection();
  await db
  .collection('recipes')
  .updateOne({ _id: new ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const { recipe } = await findById({ id });
  return { recipe };
};

const deleteRecipe = async ({ id }) => {
  const db = await getConnection();

  const { recipe } = await findById({ id });

  await db.collection('recipes')
    .deleteOne({ _id: new ObjectId(id) });

  return { recipe };
};

const addImagePath = async ({ id }) => {
  const db = await getConnection();

  const image = `localhost:3000/src/uploads/${id}.jpeg`;

  await db.collection('recipes')
    .updateOne({ _id: new ObjectId(id) }, { $set: { image } });

  const { recipe } = await findById({ id });

  return { recipe };
};

module.exports = { 
  createRecipe,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  addImagePath,
};