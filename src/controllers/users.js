const UserServices = require('../services/users');

const create = async (req, res) => {
  const userRegister = req.body;

  const user = await UserServices.create(userRegister);
  if (user.err) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  if (user === false) return res.status(409).json({ message: 'Email already registered' });

  return res.status(201).json(user);
};

module.exports = {
  create,
};
