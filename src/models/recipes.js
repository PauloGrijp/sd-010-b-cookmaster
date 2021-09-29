const { ObjectId } = require('mongodb');
const connection = require('../api/connection');

const create = async (param, payload) => {
  const db = await connection();
  const { _id } = payload;

  const recipeObject = {
    name: param.name,
    ingredients: param.ingredients,
    preparation: param.preparation,
    userId: _id,
  };

  const recipe = await db.collection('recipes').insertOne(recipeObject);

  return recipe.ops[0];
};

const getAll = async () => {
  const db = await connection();

  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getById = async (id) => {
  const db = await connection();

  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
};

const remove = async (id) => {
  const db = await connection();

  const removedRecipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });

  return removedRecipe;
};

const update = async (id, userId, recipe) => {
  const db = await connection();

  const updte = {
    ...recipe,
    _id: ObjectId(id),
    userId,
  };

  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: updte });

  return updte;
};

const uploadImg = async (id, picture) => {
  const db = await connection();

  const pictureUploaded = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { picture } },
    { returnOriginal: false },
  );

  // https://stackoverflow.com/questions/35626040/how-to-get-updated-document-back-from-the-findoneandupdate-method
  // lógica do model baseada em Mari Mohr

  return pictureUploaded.value;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  uploadImg,
};
