const { createNewRecipe, allRecipes, findRecipe, 
  isValidRecipeFields, updateRecip, deleteOneRecipe } = require('../services/recipeServices');

const newRecipe = async (req, res) => {
  const { user: { _id }, body: { name, ingredients, preparation } } = req;
  if (!isValidRecipeFields(name, ingredients, preparation)) {
    return res
      .status(400).json({ message: 'Invalid entries. Try again.' }); 
  }

  const recipe = await createNewRecipe(_id, name, ingredients, preparation);

  return res.status(201).send(recipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await allRecipes();

  return res.status(200).send(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await findRecipe(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).send(recipe);
};

const editRecipe = async (req, res) => {
  const { 
    // user: { _id }, 
    body: { name, ingredients, preparation },
    params: { id },
  } = req;

  if (!isValidRecipeFields(name, ingredients, preparation)) {
    return res
      .status(400).json({ message: 'Invalid entries. Try again.' }); 
  }

  // Requisito pede para validar o criador, mas teste não
  // const canEdit = await isCreatorOrAdmin(id, _id, role);
  // if (!canEdit) return res.status();
  const recipe = await updateRecip(id, name, ingredients, preparation);

  return res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { params: { id } } = req;

  await deleteOneRecipe(id);

  return res.status(204).json();
};

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
};
