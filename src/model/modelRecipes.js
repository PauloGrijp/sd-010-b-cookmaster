const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipeCreate = async (name, ingredients, preparation, userId) => {
  const rcp = await connection().then((db) =>
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return rcp.ops[0];
};

const oneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const rcp = await connection().then((db) =>
    db.collection('recipes')
      .findOne({ _id: ObjectId(id) }));
  return rcp;
};

const allRecipesModel = async () => {
  const rcp = await connection().then((db) =>
    db.collection('recipes')
      .find().toArray());
  return rcp;
};

const recipeUpdateModel = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => 
    db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    ));
  return recipe.value;
};

const rcpDelet = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => 
    db.collection('recipes')
      .deleteOne({ _id: ObjectId(id) }));
};

const imageCreated = async (id, path) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => 
    db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image: `localhost:3000/${path}` } },
      { returnOriginal: false },
    ));
  return recipe.value;
};

module.exports = {
  recipeCreate,
  allRecipesModel,
  oneRecipe,
  recipeUpdateModel,
  rcpDelet,
  imageCreated,
};
