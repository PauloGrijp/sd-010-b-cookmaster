const userService = require('../service/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userService
    .createUser({ name, email, password });

    if (user === 'keyNotExist') {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
  
  if (user === 'emailExist') {
    return res.status(409).json({ message: 'Email already registered' });
  }

  res.status(201).json({ user });
};

module.exports = {
  createUser,
};