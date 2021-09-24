const { ObjectId } = require('mongodb'); 

// Comments: Lista de erros
const errors = {
  invalidEntries: 'Invalid entries. Try again.',
};

// Comments: Valida se o argumento NAME passado no body existe ou não é vazio.
const validateNameRecipes = async (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name === '') return res.status(400).json({ message: errors.invalidEntries });
  
  next();
};

// Comments: Valida se o argumento INGREDIENTS passado no body existe ou não é vazio.
const validateIngredientsRecipes = async (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients === '') {
    return res.status(400).json(
      { message: errors.invalidEntries },
    );
  }

  next();
};

// Comments: Valida se o argumento PREPARATION passado no body existe ou não é vazio.
const validatePreparationRecipes = async (req, res, next) => {
  const { preparation } = req.body;

  if (!preparation || preparation === '') {
    return res.status(400).json(
      { message: errors.invalidEntries },
    );
  }

  next();
};

// Comments: Valida se o argumento ID passado na URL é ou não válido.
const validateIdRecipes = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  next();
};

module.exports = {
  validateNameRecipes,
  validateIngredientsRecipes,
  validatePreparationRecipes,
  validateIdRecipes,
};