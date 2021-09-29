const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const registerRecipe = async ({ userId, name, ingredients, preparation }) => {
  const db = await getConnection();

  const recipeCreated = await db.collection('recipes')
    .insertOne({ userId, name, ingredients, preparation });

  return recipeCreated.ops[0];
};

const getAll = async () => {
  const db = await getConnection();

  const recipes = await db.collection('recipes').find().toArray();

  return { recipes };
};

const findById = async ({ id }) => {
  const db = await getConnection();

  const recipe = await db.collection('recipes')
    .findOne(new ObjectId(id));

  return { recipe };
};

const update = async ({ id, name, ingredients, preparation }) => {
  const db = await getConnection();

   await db.collection('recipes')
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, ingredients, preparation } });

  const { recipe } = await findById({ id });

  return { recipe };
};

const deleteRecp = async ({ id }) => {
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
  registerRecipe,
  getAll,
  findById,
  update,
  deleteRecp,
  addImagePath,
};