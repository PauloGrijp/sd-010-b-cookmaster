const { create, validateLogin } = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await create({ name, email, password });
  return res.status(201).json(user);
};

const loginRequest = async (req, res) => {
  const { email, password } = req.body;
  const user = await validateLogin({ email, password });
  if (user.token) {
    return res.status(200).json(user);
  }
  return res.status(401).json(user);    
};

module.exports = { createUser, loginRequest };
