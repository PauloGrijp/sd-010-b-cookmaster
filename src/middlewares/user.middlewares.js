const connection = require('../models/connection');

const mensageError = 'Invalid entries. Try again.';
const loginError = 'All fields must be filled';

const NameValidation = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: mensageError });
    }
    next();
};

const EmailValidation = async (req, res, next) => {
    const { email } = req.body;

    if (!email || !email.includes('@') || !email.includes('.com')) {
        return res.status(400).json({ message: mensageError });
    }
    next();
};

const PasswordValidation = async (req, res, next) => {
    const { password } = req.body;

    if (!password || password === undefined) {
        return res.status(400).json({ message: mensageError });
    }
    next();
};

const EmailExist = async (req, res, next) => {
    const { email } = req.body;
    const db = await connection();   
    
    const user = await db.collection('users').findOne({ email });
    
    if (user) { 
        return res.status(409).json({ message: 'Email already registered' }); 
    }    
    next();
};

const EmailValidationLogin = async (req, res, next) => {
    const { email } = req.body;

    if (!email || !email.includes('@') || !email.includes('.com')) {
        return res.status(401).json({ message: loginError });
    }
    next();
};

const PasswordValidationLogin = async (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(401).json({ message: loginError });
    }
    next();
};

module.exports = {
    NameValidation,
    EmailValidation,
    EmailExist,
    PasswordValidation,
    EmailValidationLogin,
    PasswordValidationLogin,
};