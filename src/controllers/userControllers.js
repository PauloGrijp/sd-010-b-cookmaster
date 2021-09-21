const userValidations = require('../services/userValidations');

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { id, message } = await userValidations.createUserValidations({
    name, email, password, role,
  });
  if (message) {
    return res.status(400).json({ message });
  }
  return res.status(201).json({ user: { name, email, password, role: 'user', _id: id } });
};

module.exports = {
  createUser,
};
