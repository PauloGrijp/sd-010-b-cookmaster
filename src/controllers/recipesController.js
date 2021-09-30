const recipesService = require('../services/recipesService');

async function create(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { email } = req.user;

  const user = await recipesService.create({ name, ingredients, preparation, email });
  
  if (user === 'invalid entries') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
 
  return res.status(201).json(user);
}

module.exports = {
  create,
};