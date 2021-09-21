const jwt = require('jsonwebtoken');
const loginService = require('../Service/loginService');

const secret = 'seusecretdetoken';

const jwtConfig = {
    expiresIn: '10m',
    algorithm: 'HS256',
  };

const login = async (req, res) => {
    const user = req.body;

    try {
        const users = await loginService.login(user);
        // console.log('login');
        // console.log(users);
        if (!users) {
            return res.status(401).json({ message: 'All fields must be filled' });
        }
        if (users === 'invalid_email_passwd') {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
        const generateToken = jwt.sign({ data: users }, secret, jwtConfig);
        return res.status(200).json({ token: generateToken });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { login };