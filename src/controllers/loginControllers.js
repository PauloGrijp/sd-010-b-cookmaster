const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const STATUS_OK = {
    OK: 200,
};

const secret = 'programadorNaoTemFeriadoNemFinalDeSemana';
const jwtConfigurations = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const loginUser = async (req, res) => {
    const { email } = req.body;
    // Falta usuario sem a senha!
    const userInfos = await userModel.findUserByEmail(email);
    delete userInfos.password;

    const token = jwt.sign({ data: userInfos }, secret, jwtConfigurations);

   return res.status(STATUS_OK.OK).json({ token });
};

module.exports = {
    loginUser,
};