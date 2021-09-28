const recipesService = require('../services/RecipesService');

const addNewRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const validateFields = await recipesService
        .validateIfFieldsExists(name, ingredients, preparation);
    if (validateFields) {
        return res.status(400).json(validateFields);
    }
    const token = req.headers.authorization;
    const validateTok = await recipesService.validateToken(token);
    console.log(validateTok);
    if (validateTok.message) {
        return res.status(401).json(validateTok);
    }
    const addRecipe = await recipesService.addRecipes(name, ingredients, preparation);
    return res.status(201).json({ recipe: addRecipe.ops[0] });
};

const getAllRecipes = async (req, res) => {
    const getRecipes = await recipesService.getAllRecipes();
    return res.status(200).json(getRecipes);
};

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const getRecipe = await recipesService.getRecipeById(id);
    if (getRecipe.message) {
        return res.status(404).json(getRecipe);
    }
    return res.status(200).json(getRecipe);
};

const updateRecipe = async (req, res) => {
    console.log('entrei no controller');
    const token = req.headers.authorization;
    const validaTok = await recipesService.validateToken(token);
    if (validaTok.message) {
        return res.status(401).json(validaTok);
    }
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const updatedRecipe = await recipesService.updateRecipe(id, name, ingredients, preparation);
    return res.status(200).json(updatedRecipe);
};

module.exports = {
    addNewRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
};
