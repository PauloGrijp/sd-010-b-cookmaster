const JWT = require('jsonwebtoken');
const user = require('../models/userModel');

const createUser = async (req, res, _next) => {
  const userInfo = req.body;
  // console.log(data)
  const result = await user.createNewUser(userInfo);
  // depois de obeter o resultando da criação na camada model, fiz a desestruturação
  const { name, email, role, _id } = result;
  // console.log(name, email, role);
  res.status(201).json({ user: { name, email, role, _id } });
};

const login = async (req, res, next) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return next({
      status: 401,
      message: 'All fields must be filled',
    });
  }  
  try {
    const result = await user.getUserByEmail('email', data.email);
    if (!result || result.password !== data.password) {
      return next({
        status: 401,
        message: 'Incorrect username or password',
      });
    }

    const secret = 'tokensupersecreto';
    const jwtconfig = {
      expiresIn: '1d',
      // esse algoritmo é o msm da aula
      algorithm: 'HS256',
    };
    const { _id, email, role } = result;
    const token = JWT.sign({ id: _id, email, role }, secret, jwtconfig);
    res.status(200).json({ token });
  } catch (error) {
    next({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  login,
};
