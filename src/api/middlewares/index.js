const { findEmail } = require('../services/users');

const verifyEntries = async (req, res, next) => {
    const { name, password, email } = req.body;
    const parseEmail = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i;
    if (!(name && password && email && parseEmail.test(email))) {
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    next();
};

const verifyEmail = async (req, res, next) => {
    const { email } = req.body;
    const foundEmail = await findEmail(email);
    if (foundEmail !== null) {
        return res.status(409).json({ message: 'Email already registered' });
    }
    next();
};

const verifyLoginEntries = async (req, res, next) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(401).json({ message: 'All fields must be filled' });
    }
    next();
};

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const foundEmail = await findEmail(email);
    console.log(foundEmail);
    if (foundEmail === null || foundEmail.password !== password) {
        return res.status(401).json({ message: 'Incorrect username or password' });
    }
    next();
};

module.exports = { verifyEntries, verifyEmail, verifyLoginEntries, validateLogin };