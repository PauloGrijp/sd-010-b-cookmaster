const recipesService = require('../services/recipesService');

async function getAll(_req, res) {
  const recipes = await recipesService.getAll();
  
  return res.status(200).json(recipes);
}

async function getById(req, res) {
  const { id } = req.params;
  const recipe = await recipesService.getById({ id });

  if (recipe === 'wrong id') return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
}

async function create(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { email } = req.user;

  const user = await recipesService.create({ name, ingredients, preparation, email });
  
  if (user === 'invalid entries') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
 
  return res.status(201).json(user);
}

async function update(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { email } = req.user;
  
  const user = await recipesService.update({ name, ingredients, preparation, email });
  console.log(user);
  
  if (user === 'invalid entries') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
 
  return res.status(200).json(user);
}

async function remove(req, res) {
  const { id } = req.params;
  const { email } = req.user;
  
  const user = await recipesService.remove({ id, email });

  if (user === 'invalid entries') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
 
  return res.status(204).json(user);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};