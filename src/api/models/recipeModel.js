const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipeData = async ({ _id, name, ingredients, preparation }) => {
  const { insertedId } = await connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: _id }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: insertedId,
    },
  };
};

const getAllRecipesData = async () => {
  const allRecipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return allRecipes;
};

const getRecipeData = async (id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRec = async (id, body, idUser) => {
  await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: body }));

  return {
    _id: id,
    name: body.name,
    ingredients: body.ingredients,
    preparation: body.preparation,
    userId: idUser,
  };
};

const setPicFile = async (body, idRecipe) => {
  await connection().then((db) =>
    db.collection('recipes')
    .updateOne({ _id: ObjectId(idRecipe) },
    { $set: { image: `localhost:3000/src/uploads/${idRecipe}.jpeg` } }));
    const recipe = await getRecipeData(idRecipe);

    // return {
    //   _id: idRecipe,
    //   name: body.name,
    //   ingredients: body.ingredients,
    //   preparation: body.preparation,
    //   userId: idUser,
    //   image: `localhost:3000/src/uploads/${idRecipe}.jpeg`,
    // };
    return recipe;
};

const removeRecipeData = async (id) => {
    const { value } = await connection().then((db) =>
    db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));
  return value;
};

module.exports = {
  createRecipeData,
  getAllRecipesData,
  getRecipeData,
  updateRec,
  removeRecipeData,
  setPicFile,
};
