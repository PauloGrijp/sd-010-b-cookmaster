const { createUser, findEmail } = require('../services/users');

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
    console.log(foundEmail);
    if (foundEmail !== null) {
        return res.status(409).json({ message: 'Email already registered' });
    }
    next();
};

const create = async (req, res) => {
    const { name, password, email } = req.body;
    const created = await createUser(name, email, password, 'user');
    return res.status(201).json({ user: { id: created.id, name, email, role: 'user' } });
};

module.exports = { verifyEntries, verifyEmail, create };