const erroCode = {
    Unauthorized: 401,
};

const message = {
    NOTEMAILORPASSWORD: 'All fields must be filled',
    INCORRECTVALUES: 'Incorrect username or password',

};

const loginModel = require('../models/loginModel');

const emailAndPasswordExist = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(erroCode.Unauthorized).json({ message: message.NOTEMAILORPASSWORD });
    }

    next();
  };

const checkEmailAndPassword = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await loginModel.findUserByEmail(email);
    if (!user || user.password !== password) {
        return res.status(erroCode.Unauthorized).json({ message: message.INCORRECTVALUES });
    }

next();
};

module.exports = {
    emailAndPasswordExist,
    checkEmailAndPassword,
};