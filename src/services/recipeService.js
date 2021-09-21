const recipesModel = require('../models/recipesModel');

const existField = (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
      return false;
    }
    return true;
};

const create = async ({ name, ingredients, preparation }, email) => {
    const existFields = existField(name, ingredients, preparation);
    if (!existFields) {
      return { message: 'Invalid entries. Try again.' }; 
    }
    const { id } = await recipesModel.create({ name, ingredients, preparation }, email);
    return { id, name, ingredients, preparation };
};

module.exports = { create };