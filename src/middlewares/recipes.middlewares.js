const jwt = require('jsonwebtoken');
// const connection = require('../models/connection');

const SECRETKEY = '123456789';

const mensageError = 'Invalid entries. Try again.';

const TokenValidation = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Falta um token valido' });
    }

    try {
        const decoded = jwt.verify(token, SECRETKEY);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

const RecipeValidation = async (req, res, next) => {
    const { name, ingredients, preparation } = req.body;

    if (!name || !ingredients || !preparation) {
        return res.status(400).json({ message: mensageError });
    }
    next();
};

module.exports = {
    TokenValidation,
    RecipeValidation,
};