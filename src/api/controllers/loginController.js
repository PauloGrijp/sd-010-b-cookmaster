const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const secret = 'seusecretdetoken';

const login = catchAsync(async (req, res) => {
  const { email, role, _id } = req.user;

  const jwtConfig = {
    expiresIn: '10min',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ id: _id, email, role }, secret, jwtConfig);

  res.status(200).json({ token });
});

module.exports = { login };
