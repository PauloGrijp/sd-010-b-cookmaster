const recipesModel = require('../models/recipesModel');

const create = async (data) => recipesModel.create(data);

module.exports = {
  create,
};