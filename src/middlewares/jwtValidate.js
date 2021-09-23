const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
// const { createRecipes } = require('../models/recipes');

const secret = 'secretdetoken';

const recipesFillersCheck = rescue(async (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
    return res
        .status(400)
        .json({ message: 'Invalid entries. Try again.' }); 
}
next();
});

const isJWTvalid = rescue(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res
        .status(401)
        .json({ message: 'jwt malformed' });
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
module.exports = { isJWTvalid, recipesFillersCheck };