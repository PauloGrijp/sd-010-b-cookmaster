const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
// const { createRecipes } = require('../models/recipes');

const secret = 'secretdetoken';

const isJWTRecipe = rescue(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res
        .status(401)
        .json({ message: 'missing auth token' });
    }
    try {
        const verify = jwt.verify(token, secret);
        // quando eu faço req.user ou req.qualquerCoisa eu consigo exportar o verify ou qualquer outro nome;
        req.user = verify;
        next();
    } catch (err) {
        return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }
});
module.exports = { isJWTRecipe };