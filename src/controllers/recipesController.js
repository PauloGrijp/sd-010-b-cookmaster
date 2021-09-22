const recipesService = require('../services/recipesService');

const create = async (req, res, next) => {
  const { body } = req;
  const token = req.headers.authorization;
  const data = await recipesService.create(body, token);
  if (data.message) {
    return next(data);
  }
  console.log(data);
  return res.status(201).json(data);
};

module.exports = {
  create,
};