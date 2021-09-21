const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const secret = 'secret';
  const { _id, email, role } = req.user;
  const token = jwt.sign({ _id, email, role }, secret);
  res.status(200).json({ token });
};

module.exports = login;