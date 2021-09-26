const userService = require('../services/userService');

const HTML_STATUS_CREATED = 201;

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const newUser = await userService.registerUser(name, email, password);
  
  if (newUser.err) {
    return res.status(newUser.err.status).json(newUser.err.message);
  }

  return res.status(HTML_STATUS_CREATED).json(newUser);
}

module.exports = {
  registerUser,
};
