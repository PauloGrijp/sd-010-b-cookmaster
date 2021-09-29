const { createRecipe,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  addImagePath } = require('../models/recipeModel');

  const recipeCreate = async (request, response) => {
    const { user } = request.user;
    const { name, ingredients, preparation } = request.body;
    const { _id: userId } = user;

    const recipe = await createRecipe({ userId, name, ingredients, preparation });

    response.status(201).json({ recipe });
  };

  const listAllRecipes = async (request, response) => {
    const { recipes } = await getAll();

    return response.status(200).json(recipes);
  };

  const findRecipeId = async (request, response) => {
    const { id } = request.params;

    const { recipe } = await findById({ id });

    return response.status(200).json(recipe);
  };

  const recipeUpdate = async (request, response) => {
    const { id } = request.params;
    const { name, ingredients, preparation } = request.body;

    const { recipe } = await updateRecipe({ id, name, ingredients, preparation });

    return response.status(200).json(recipe);
  };

  const recipeDelete = async (request, response) => {
    const { id } = request.params;

    const { recipe } = await deleteRecipe({ id });

    return response.status(204).json(recipe);
  };

  const addImage = async (req, res) => {
    const { id } = req.params;
  
    const { recipe } = await addImagePath({ id });
  
    return res.status(200).json(recipe);
  };

  const notImg = (error, response, _request, _next) => {
    response.status(400).send({ error: error.message });
  };

  module.exports = {
    recipeCreate,
    listAllRecipes,
    findRecipeId,
    recipeUpdate,
    recipeDelete,
    notImg,
    addImage,
  };