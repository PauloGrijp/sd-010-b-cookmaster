const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const createdRecipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: createdRecipe.insertedId,
    },
  };
};

const findAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const findById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
  );
  const updatedRecipe = await findById(id);
  const { userId } = updatedRecipe;

  return { _id: id, name, ingredients, preparation, userId }; 
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const exclude = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return exclude;
};

const insertImage = async (id) => {
  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } },
  );
  const updatedRecipe = await findById(id);
  return updatedRecipe;
};

module.exports = {
  create,
  findAll,
  findById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};