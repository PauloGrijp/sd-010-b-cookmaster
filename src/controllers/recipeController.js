const recipeService = require('../services/recipeService');
const recipeModel = require('../models/recipeModel');

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

const getAll = async (_req, res) => {
  try {
      const recipes = await recipeModel.getAll();
      return res.status(200).json(recipes);
  } catch (error) {
      return res.status(500).json({ message: 'Deu ruim' });
  }
};

const getById = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await recipeModel.recipeIdExists(id);

      if (!result) {
        return res.status(404).json({ message: 'recipe not found' });
      }
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({ message: 'Deu ruim' });
  }
};

const updateRecipe = async (req, res) => {
  try {
      const { name, ingredients, preparation } = req.body;
      const { id } = req.params;
      const userId = req.payload.idUser;

      await recipeModel.updateRecipe({ id, name, ingredients, preparation, userId });

      return res.status(200).json({ _id: id, name, ingredients, preparation, userId });
  } catch (error) {
      return res.status(500).json({ message: 'Deu ruim' });
  }
};

module.exports = { create, getAll, getById, updateRecipe };