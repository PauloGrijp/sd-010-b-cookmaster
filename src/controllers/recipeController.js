const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.payload.idUser;
    const result = await recipeService.validations({ name, ingredients, preparation, userId });

    if (result.erro) {
      return res.status(result.erro.code).json({ message: result.erro.message });
    }
    
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Deu ruim' });
  }
};

module.exports = { create };