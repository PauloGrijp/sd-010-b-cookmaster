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
  const recipe = await Model.getRecipesById(id);

  return recipe;
};

module.exports = {
    createItem,
    getAll,
    getRecipesById,
};