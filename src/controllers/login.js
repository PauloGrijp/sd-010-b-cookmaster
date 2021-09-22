const User = require('../models/user');

module.exports = async (req, res) => {
  try {
  const { email } = req.body;
  const user = await User.findEmail(email);
  console.log(user);
  return res.status(200).json({ message: 'Login efetuado com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
