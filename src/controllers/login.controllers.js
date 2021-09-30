const jwt = require('jsonwebtoken');
const { getUserData } = require('../models/user.model');

const secret = 'mytokensecret';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserData(email);

    if (user === null || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const { _id, role } = user;
    const userData = {
      _id,
      email,
      role,
    };

    const userToken = jwt.sign({ data: userData }, secret, { expiresIn: '1h', algorithm: 'HS256' });

    return res.status(200).json({ token: userToken });
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;