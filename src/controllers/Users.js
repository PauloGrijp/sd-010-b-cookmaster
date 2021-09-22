const User = require('../services/Users');
const userValidator = require('../validators/Users');
const { CREATE, BAD_REQUEST } = require('../utils/statusCodes');

const createUser = async (req, res) => {
  const { error } = userValidator(req.body);

  if (error) return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });

  const { name, email, password } = req.body;
  const user = await User.createUser({ name, email, password });

  if (user.code) return res.status(user.code).json({ message: user.message });

  return res.status(CREATE).json(user);
};

module.exports = {
  createUser,
}; 