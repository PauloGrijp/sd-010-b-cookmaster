const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { findUser } = require('../models/user');

const secret = 'secretdetoken';

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
};

const jwtCheckEmailPassword = rescue(async (req, res, next) => {
    const regex = /((\w+)@(\w+)\.(\w+))/i;
    const { email, password } = req.body;
    if (!email || !password || !email.match(regex)) {
 return res
        .status(401)
        .json({ message: 'All fields must be filled' }); 
}
next();
});

const jwtSetup = rescue(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser(email);

    if (!user || user.password !== password) {
    return res
        .status(401)
        .json({ message: 'Incorrect username or password' });
    }
const token = jwt.sign({ data: user }, secret, jwtConfig);
res.status(200).json({ token });
    });
module.exports = { jwtCheckEmailPassword, jwtSetup };