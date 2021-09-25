const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipeModel = async (recipe, userId) => {
  const DB = await connection();
  const recipeDB = await DB.collection('recipes').insertOne({ ...recipe, userId });
  return { recipe: recipeDB.ops[0] };
};

const getRecipesModel = async () => connection()
  .then((DB) => DB.collection('recipes').find().toArray());

const getRecipesIDModel = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  const DB = await connection();
  return DB.collection('recipes').findOne(new ObjectId(id));
};

const putRecipesIDModel = async (id, data) => {
  if (!ObjectId.isValid(id)) { return 422; }
  connection().then((DB) => DB.collection('recipes').updateOne({ _id: ObjectId(id) }, 
    { $set: { ...data } }));
  return connection()
  .then((DB) => DB.collection('recipes').findOne(ObjectId(id)));
};

const deleteRecipesIDModel = async (id) => {
  if (!ObjectId.isValid(id)) { return 'error'; }
  const item = connection().then((DB) => DB.collection('recipes').findOne(ObjectId(id)));
  connection().then((DB) => DB.collection('recipes')
    .deleteOne({ _id: ObjectId(id) })); 
  return item;
};

const putImageModel = async (id) => {
  if (!ObjectId.isValid(id)) { return 'error'; }
  await connection()
  .then((db) => db.collection('recipes').updateOne({ _id: new ObjectId(id) },
   { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } }));
  const result = await getRecipesIDModel(id);
  return result;
};

module.exports = {
  createRecipeModel,
  getRecipesModel,
  getRecipesIDModel,
  putRecipesIDModel,
  deleteRecipesIDModel,
  putImageModel,
};