const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId,
  });

  return { recipe: { name, ingredients, preparation, userId, _id: insertedId } };
};

const recipes = async () => {
  const db = await connection();

  const listRecipes = await db.collection('recipes').find().toArray();

  return listRecipes;
};

const uniquiRecipe = async (id) => {
  const db = await connection();

  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
};

const editRecipe = async (id, { name, ingredients, preparation }, userId) => {
  const db = await connection();

  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: {
      name, ingredients, preparation,
    } },
  );

  return { _id: id, name, ingredients, preparation, userId };
};

const uploadImg = async (id) => {
  const db = await connection();

  const { _id, name, ingredients, preparation, userId } = await db
  .collection('recipes').findOne({ _id: ObjectId(id) });

  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: {
      image: `localhost:3000/src/uploads/${id}`.concat('.jpeg'),
      },
    },
    );

  return { 
    _id,
    name,
    ingredients,
    preparation,
    userId,
    image: `localhost:3000/src/uploads/${id}`.concat('.jpeg') };
};

const delRecipe = async (id) => {
  const db = await connection();

  const recipeDeleted = await db.collection('recipes').deleteOne({
    _id: ObjectId(id),
  });

  return recipeDeleted;
};

module.exports = {
  createRecipe,
  recipes,
  uniquiRecipe,
  editRecipe,
  delRecipe,
  uploadImg,
};
