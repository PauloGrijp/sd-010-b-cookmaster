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
    return res.status(201).json({ recipe: addRecipe });
};

module.exports = {
    addNewRecipe,
};
