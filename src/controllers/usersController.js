const { StatusCodes } = require('http-status-codes');
const JWT = require('jsonwebtoken');
const service = require('../services/usersService');

const secret = 'super-senha-que-ninguem-sabe';
const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await service.createUser({ name, email, password, role });
    return res.status(StatusCodes.CREATED).json({
      user: {
        name,
        email,
        role: 'user',
        _id: user.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await service.userLogin({ email, password });
    if (!login || login.error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: login.message });
    }
    const token = JWT.sign({ data: login }, secret, jwtConfiguration);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { 
  createUser,
  userLogin,
};
