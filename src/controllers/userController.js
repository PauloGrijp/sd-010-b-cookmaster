const userService = require('../services/userService');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;

// req 1
const userCreate = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { id, message } = await userService.userCreateValidation({
      name, email, password, role });

    if (message === 'Invalid entries. Try again.') {
      return res.status(BAD_REQUEST).json({ message });
    }

    if (message === 'Email already registered') {
      return res.status(CONFLICT).json({ message });
    }

    return res.status(CREATED)
      .json({ user: { _id: id, name, email, role: 'user' } });
};

module.exports = {
  userCreate,
};
