const { servRecipes } = require('../services/recipes');

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

module.exports = {
  contRecipes,
};