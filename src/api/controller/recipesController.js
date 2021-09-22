const recipesService = require('../service/recipesService');
const jwtvalid = require('../middlewares/jwtvalid');

const createRecipes = async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;

  const validate = jwtvalid(token);

  if (validate === 'jwt malformed') {
    return res.status(401).json({ message: validate });
  }

  const { _id } = validate;

  const recipe = await recipesService
    .createRecipes({ name, ingredients, preparation, userId: _id });
  
  if (recipe === 'keyNotExist') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return res.status(201).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const recipes = await recipesService.getAllRecipes();
  res.status(200).json(recipes);
};

const getByIdRecipes = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipesService.getByIdRecipes(id);

  if (!recipes) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  res.status(200).json(recipes);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByIdRecipes,
};