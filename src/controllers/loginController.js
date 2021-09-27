const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');

const secret = 'minhachaveextremamentesecretaninguemvaisaberquale';

const getUser = async (req, res) => {
  const userFound = await loginServices.getUser(req.body);

  if (userFound.error) {
    const { error: { status, message } } = userFound;
    return res.status(status).json({ message });
  }

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userFound }, secret, jwtConfig);

  res.status(200).json({ token });
};

module.exports = {
  getUser,
};