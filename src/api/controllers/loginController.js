const loginServices = require('../services/loginServices');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginServices.loginUser(email, password);
  return res.status(200).json(result);
};

module.exports = {
  loginUser,
};