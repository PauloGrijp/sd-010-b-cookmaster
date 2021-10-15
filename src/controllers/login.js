const jwt = require('jsonwebtoken');
const UserModel = require('../models/usersModel');

const jwtSecretForThisProject = 'xablauzadaDaGalera';

const generateToken = async (user) => {
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(user, jwtSecretForThisProject, jwtConfig);

  return token;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
  return res
    .status(401)
    .json({ message: 'All fields must be filled' }); 
  }

  const user = await UserModel.findUserByEmail(email);

  if (!user || password !== user.password) {
  return res
    .status(401)
    .json({ message: 'Incorrect username or password' }); 
  }

  const token = generateToken(user);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};
