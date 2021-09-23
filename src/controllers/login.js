const jwt = require('jsonwebtoken');
const { checkEmailPassword } = require('../services');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const checkedEmailPassword = await checkEmailPassword(email, password);

  if (checkedEmailPassword.err) return next(checkedEmailPassword.err);

  const SECRET = 'superSenha';
  const { _id, role } = checkedEmailPassword;
  const payload = {
      _id,
      email: checkedEmailPassword.email,
      role,
   };
  const token = jwt.sign(payload, SECRET);

  return res.status(200).json({ token });
};
