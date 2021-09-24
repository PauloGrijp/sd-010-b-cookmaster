const userValidations = require('../services/userValidations');

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await userValidations.createUserValidations({
    name, email, password, role,
  });
  if (user.message === 'Invalid entries. Try again.') {
    return res.status(400).json({ message: user.message });
  }
  if (user.message === 'Email already registered') {
    return res.status(409).json({ message: user.message });
  }
  return res.status(201).json({ user: { name, email, role: 'user', _id: user.id } });
};

module.exports = {
  createUser,
};
