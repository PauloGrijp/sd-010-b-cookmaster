const recipesModel = require('../model/recipesModel');
const validations = require('../validations/validations');

const getAll = async () => {
    const users = await recipesModel.getAll();
    return users;
};
const getById = async (id) => {
    const recipe = await recipesModel.getById(id);
    return recipe;
};

const createRecipe = async (recipe, id) => {
    const infosRecipe = validations.infosRecipe(recipe);
    if (infosRecipe === false) return false;
    const response = await recipesModel.create(recipe, id);
    return response;
};
const updateRecipe = async (recipe, id, idRecipe) => {
    const infosRecipe = validations.infosRecipe(recipe);
    if (infosRecipe === false) return false;
    const response = await recipesModel.update(recipe, id, idRecipe);
    return response;
};

const deleteRecipe = async (idRecipe, _users) => {
    // console.log(idRecipe);
    // console.log(users);

    const recipe = await recipesModel.exclude(idRecipe);

    if (recipe) {
        return recipe;
    }
    return false;
};

const uploadPicture = async (id, picture) => {
    const pictureUploaded = await recipesModel.uploadPicture(id, picture);
    console.log('\n\n\n', pictureUploaded, '\n\n\n');
    return pictureUploaded;
};

module.exports = { createRecipe, getAll, getById, updateRecipe, deleteRecipe, uploadPicture };