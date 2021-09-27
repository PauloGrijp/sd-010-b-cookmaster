const models = require('../models/recipes');

const create = async (param) => {
  const recipe = await models.create(param);

  return recipe;
};

module.exports = {
  create,
};
