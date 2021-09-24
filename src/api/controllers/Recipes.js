const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
  },
} = require('http-status-codes');
const Recipes = require('../services/Recipes');

const createRecipe = async (req, res) => {
  try {
    const { body: recipe } = req;
    const { _id: userId } = req.user; 
    const newRecipe = await Recipes.createRecipe(recipe, userId);
    if (newRecipe.message) return res.status(BAD_REQUEST).json(newRecipe);

    return res.status(CREATED).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send('Something went wrong');
  }
};

module.exports = {
  createRecipe,
};
