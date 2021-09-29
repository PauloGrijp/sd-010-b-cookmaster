const service = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const createdUser = await service.createUser({ name, email, password });

  if (createdUser === 'invalid entry') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (createdUser === 'user exists') {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return res.status(201).json(createdUser);
};

module.exports = {
  createUser,
};
