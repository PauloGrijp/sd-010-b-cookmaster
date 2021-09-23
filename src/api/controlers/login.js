const jwt = require('jsonwebtoken');
const { findEmail } = require('../services/users');

const secret = '12345';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findEmail(email);
    const { _id } = user;
    const token = jwt.sign({ email, password, id: _id }, secret, jwtConfig);

    return res.status(200).json({ token });
};

module.exports = { login };