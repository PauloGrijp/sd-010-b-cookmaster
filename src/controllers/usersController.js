const usersService = require('../services/usersService');
const errs = require('./err/usersErr');

async function create(req, res) {
  const { name, email, password } = req.body;

  const user = await usersService.create({ name, email, password });
  
  if (user === 'missing values') return res.status(400).json(errs.ERR_VALUES);
  if (user === 'email exists') return res.status(409).json(errs.ERR_EMAIL);

  return res.status(201).json(user);
}

module.exports = {
  create,
};