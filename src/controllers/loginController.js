const loginService = require('../services/loginService');

const login = async (req, res) => {
  const loginUser = await loginService.validateLogin(req.body);
  if (!loginUser.token) return res.status(401).json(loginUser);
  return res.status(200).json(loginUser);
};

module.exports = {
  login,
};