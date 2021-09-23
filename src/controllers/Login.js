const Login = require('../services/Login');
const loginValidator = require('../validators/Login');
const { SUCCESS, UNAUTHORIZED } = require('../utils/statusCodes');

const login = async (req, res) => {
  const { error } = loginValidator(req.body);

  if (error) return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });

  const { email, password } = req.body;
  const token = await Login.login(email, password);

  if (token.code) return res.status(token.code).json({ message: token.message });

  return res.status(SUCCESS).json(token);
};

module.exports = {
  login,
}; 