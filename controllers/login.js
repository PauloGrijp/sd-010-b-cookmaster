const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'mytokensecret';
const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUser(email);
    
    if (user === null || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const { _id, role } = user;
    const userData = {
      _id,
      email,
      role,
    };

    const userToken = jwt.sign({ data: userData }, secret, jwtConfig);
    
    return res.status(200).json({ token: userToken });
  } catch (error) {
    console.log(error);
  }
};