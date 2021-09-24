const { createRecipe, listRecipes, recipesById, updateById, deleteRecipe,
 } = require('../models/recipes_model');

const create = async (name, ingredients, preparation, userId) => {
    const newRecipe = await createRecipe(name, ingredients, preparation, userId);

    return newRecipe;
};

const getAll = async () => {
    const recipes = await listRecipes();
    return recipes;
};

const getById = async (id) => {
    const recipe = await recipesById(id);

    if (!recipe) return { error: { message: 'recipe not found' } };
    console.log('oi');

    return recipe;
};

const update = async (req) => {
    const recipe = await updateById(req);
    return recipe;
};

const remove = async (id) => {
    const recipe = await deleteRecipe(id); 
    console.log(recipe, 'service');

    return recipe;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};