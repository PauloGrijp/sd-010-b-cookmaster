const { ModelAllRecipes } = require('../models/recipes');
const { servRecipes, servListByID } = require('../services/recipes');

const contRecipes = async (req, res) => {
  const recipes = req.body;
  const tokenReceived = req.headers.authorization;
  const result = await servRecipes(recipes, tokenReceived);
    if (result.err) {
      const { code, err } = result;
      return res.status(code).json(err);
    }
    const { code, recipe } = result;
 return res.status(code).json({ recipe });
};

const contListRecipes = async (req, res) => {
  const result = await ModelAllRecipes();
  const { code, allRecipes } = result;
  return res.status(code).json(allRecipes);
};

const contListByID = async (req, res) => {
  const { id } = req.params;
 const result = await servListByID(id);
 if (result.err) {
  const { code, err } = result;
  return res.status(code).json(err);
}
const { code, recipe } = result;
return res.status(code).json(recipe);
};

module.exports = {
  contRecipes,
  contListRecipes,
  contListByID,
};