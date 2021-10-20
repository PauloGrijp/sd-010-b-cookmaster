const Model = require('../models/RecipesModels');

const validateRecipes = (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
      return {
        err: {
          status: 400,
          message: { message: 'Invalid entries. Try again.' },
        },
      };
    }
};

const idValidator = (id) => {
  const idRegex = /^.{24}$/;
  const validId = idRegex.test(id);
  
  if (!validId) {
    return {
      err: {
        status: 404,
        message: { message: 'recipe not found' },
      },
    };
  }
};

const createItem = async (name, ingredients, preparation) => {
    if (validateRecipes(name, ingredients, preparation)) {
      return validateRecipes(name, ingredients, preparation);
    }     

    const recipes = await Model.createItem(name, ingredients, preparation);

    return recipes;
};

const getAll = async () => {
  const recipes = await Model.getAll();

  return recipes;
};

const getRecipesById = async (id) => {
  if (idValidator(id)) return idValidator(id);

  const recipe = await Model.getRecipesById(id);

  if (!recipe) return idValidator(id);

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  if (idValidator(id)) return idValidator(id);

  if (validateRecipes(name, ingredients, preparation)) {
    return validateRecipes(name, ingredients, preparation);
  } 

  const recipe = await Model.updateRecipe(id, name, ingredients, preparation);

  return recipe;
};

const deleteRecipe = async (id) => {
  if (idValidator(id)) return idValidator(id);
  
  const recipe = await Model.deleteRecipe(id);

  return recipe;
};

module.exports = {
    createItem,
    getAll,
    getRecipesById,
    updateRecipe,
    deleteRecipe,
};