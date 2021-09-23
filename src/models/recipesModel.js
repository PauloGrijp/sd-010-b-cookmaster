const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const recipes = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipes.insertedId,
  },
  };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes')
  .find()
  .toArray();
  return recipes;
};

const getOneRecipes = async (id) => {
  if (!ObjectId.isValid(id)) return null;
const db = await getConnection();
const oneRecipe = await db.collection('recipes')
.findOne({ _id: ObjectId(id) });
return oneRecipe;
};

const updateRecipes = async (body, id, _userId) => {
  const { name, ingredients, preparation } = body;
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const update = await db.collection('recipes')
  .findOneAndUpdate({ _id: ObjectId(id) },
  { $set: { name, ingredients, preparation } }, { returnOriginal: false });
  return update.value;
};

const deleteRecipes = async (id) => {
  // if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const addImage = async (id, file, _userId) => {
  const db = await getConnection();
  const newImage = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/${file.path}` } },
    { returnOriginal: false },
    );
    return newImage.value;
};

module.exports = {
   registerRecipes,
   getAllRecipes,
   getOneRecipes,
   updateRecipes,
   deleteRecipes,
   addImage,
};