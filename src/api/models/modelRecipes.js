const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) => {
  const recipeToCreate = { name, ingredients, preparation, userId: id };
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne(recipeToCreate));
  // console.log(newRecipe);
  return {
    name,
    ingredients,
    preparation,
    userId: id,
    _id: newRecipe.insertedId,
  };
};

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  // console.log(id);
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeById = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  // console.log(recipeById);

  return recipeById;
};

const updateRecipe = async (id, newUpdatedRecipe, userId) => {
  // console.log(id, newUpdatedRecipe, userId);
  if (!ObjectId.isValid(id)) {
    return null;
  }

  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ $and: [{ _id: ObjectId(id) }, { userId }] },
        { $set: { newUpdatedRecipe } }));

  // console.log(updatedRecipe);
  return {
    _id: id,
    name: newUpdatedRecipe.name,
    ingredients: newUpdatedRecipe.ingredients,
    preparation: newUpdatedRecipe.preparation,
    userId,
  };
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const deleted = await connection()
    .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));

  if (!deleted.value) return null;

  return deleted;
};

const updateImage = async (id, image) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const newImage = await connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } }, { returnOiginal: false }));

  if (newImage.value.image !== image) return null;

  return newImage.value;
};

module.exports = {
  createRecipe,
  getAll,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImage,
};