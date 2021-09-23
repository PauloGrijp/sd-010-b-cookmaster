const jwt = require('jsonwebtoken');

const secret = '12345';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const login = async (req, res) => {
    const { email, password } = req.body;
    const token = jwt.sign({ email, password }, secret, jwtConfig);

    return res.status(200).json({ token });
};

module.exports = { login };