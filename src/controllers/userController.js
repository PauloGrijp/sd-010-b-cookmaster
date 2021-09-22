const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

const secret = 'semprealerta';

const CREATED = 201;

const createdUser = async (req, res) => {
  const userData = req.body;
  const newUser = await userService.created(userData);

  if (Object.keys(newUser).includes('err')) {
    return res.status(newUser.err.code).json({ message: newUser.err.message });
  }
  return res.status(CREATED).json({ user: newUser });
};

//  --------------------- REQUISITO 2 --------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    const { _id, role } = user;
    const jwtConfig = {
      expiresIn: '15m',
      algorithm: 'HS256',
    };
    
    const token = jwt.sign({ id: _id, email, role }, secret, jwtConfig);
    
    return res.status(200).json({ token });
  } catch (error) {
    const { err: { code, message } } = error;
    return res.status(code).json({ message });
  }
};

module.exports = {
  createdUser,
  login,
};