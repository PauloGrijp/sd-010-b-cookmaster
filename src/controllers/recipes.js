const { StatusCodes } = require('http-status-codes');
const servicesRecipes = require('../services/recipes');

const createRecipe = async (req, res) => {
    const { body: { name, ingredients, preparation }, user } = req;
    const recipe = { name, ingredients, preparation, userId: user };
    const result = await servicesRecipes.createRecipe(recipe);
    if (result.errorType === 'bad_request - invalid entries') {
        return res.status(StatusCodes.BAD_REQUEST).json(result.error);
    }
    return res.status(StatusCodes.CREATED).json(result);
};

const getAllRecipes = async (req, res) => {
    const result = await servicesRecipes.getAllRecipes();
    return res.status(StatusCodes.OK).json(result);
};

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const result = await servicesRecipes.getRecipeById(id);
    if (result.errorType === 'not_found') {
        return res.status(StatusCodes.NOT_FOUND).json(result.error);
    }
    return res.status(StatusCodes.OK).json(result);
};

const editRecipe = async (req, res) => {
    const { id } = req.params;
    const result = await servicesRecipes.editRecipe(req.body, id);
    return res.status(StatusCodes.OK).json(result);
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const result = await servicesRecipes.deleteRecipe(id);
    if (result === 1) {
        return res.status(StatusCodes.NO_CONTENT).json();
    }
};

const addImageToRecipe = async (req, res) => {
    const { filename } = req.file;
    const result = await servicesRecipes.addImageToRecipe(filename);
    if (result.errorType === 'no change on database') { 
        return res.status(StatusCodes.BAD_REQUEST).json(result.error); 
}
    return res.status(StatusCodes.OK).json(result);
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    editRecipe,
    deleteRecipe,
    addImageToRecipe,
};
