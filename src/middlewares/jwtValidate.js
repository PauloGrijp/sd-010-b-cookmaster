const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
// const { findUser } = require('../models/user');

const secret = 'secretdetoken';

const recipesFillersCheck = rescue(async (req, res, next) => {
    console.log('recipesFillers');
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
        const { data: { _id } } = jwt.verify(token, secret);
        console.log(_id);
        res.status(201).json({ recipe: { ...req.body, userId: _id, _id } });
        console.log(req.body);
    } catch (err) {
        return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }
    next();
});
module.exports = { isJWTvalid, recipesFillersCheck };