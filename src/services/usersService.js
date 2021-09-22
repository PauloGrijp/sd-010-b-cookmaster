// ifNamePasswordOrEmailNotExists
const userModel = require('../models/usersModel');

const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const erroCode = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
};

const message = {
    BAD_REQUEST: 'Invalid entries. Try again.',
    CONFLICT: 'Email already registered',

};

const ifNamePasswordOrEmailNotExists = (req, res, next) => {
    const { name, email, password } = req.body;
    console.log('service?');
    if (!name || (!email || !validEmail.test(email)) || !password) {
        return res.status(erroCode.BAD_REQUEST).json({ message: message.BAD_REQUEST });
    }

    next();
  };

const ifEmailExists = async (req, res, next) => {
    const { email } = req.body;
    // try {
        console.log('Email Existe?');
    const emailExists = await userModel.findUserByEmail(email);
    if (emailExists) {
        console.log(emailExists);
     return res.status(erroCode.CONFLICT).json({ message: message.CONFLICT });
    }
    next();
};

  module.exports = { ifNamePasswordOrEmailNotExists, ifEmailExists };