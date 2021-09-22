const recipes = require('../service/recipes');
const { renderRecipesObject } = require('../helpers/renderRecipesObject');

const createRecipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;  

    const recipe = await recipes
    .createRecipes(renderRecipesObject(name, ingredients, preparation, userId));
    return res.status(201).json(recipe);
};

const getAll = async (req, res) => {
    const recipe = await recipes.getAll();
    return res.status(200).json(recipe);
};

const findRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipes.findRecipe(id);
    if (recipe.message) return res.status(404).json(recipe);
    return res.status(200).json(recipe);
};
const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { userId, role } = req.user;  
    
    const recipe = await recipes
    .updateRecipe(id, renderRecipesObject(name, ingredients, preparation, userId), role);

    if (recipe.message) return res.status(401).json(recipe);

    // console.log('recipe on controller', recipe, req.user);
    return res.status(200).json(recipe.recipe);
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.user;  
    
    const recipe = await recipes
    .deleteRecipe(id, userId, role);
    // console.log('delete recipe controller', id, userId, role, 'recipe', recipe.message);
    
    if (recipe.message) return res.status(401).json(recipe);

    return res.status(204).json();
};

const insertImage = async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.user;  
    const url = `localhost:3000/src/uploads/${req.params.id}.jpeg`;
    console.log(req.file, 'insert image controller');
    if (req.file.mimetype !== 'image/jpeg') {
    return res.status(400).json({
            error: { message: 'Extension must be `jpg`' },
    });
} 
    const recipe = await recipes.insertImage(id, userId, role, url);

    return res.status(200).json(recipe.recipe);
  };

module.exports = { createRecipes, getAll, findRecipe, updateRecipe, deleteRecipe, insertImage };