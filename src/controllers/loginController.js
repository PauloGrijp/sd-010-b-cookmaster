const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'seusecretdetoken';

const login = async (req, res) => {
    const { email, password } = req.body;
    const loginUser = await loginService.login({ email, password });

    if (loginUser.message) {
		return res.status(statusCode.UNAUTHORIZED).json(
			{ message: loginUser.message },
		);
	} 

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };

    const token = jwt.sign({ data: loginUser }, secret, jwtConfig);  

    return res.status(statusCode.OK).json({ token });
};

module.exports = { login };