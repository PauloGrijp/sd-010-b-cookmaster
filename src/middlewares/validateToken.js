const jwt = require('jsonwebtoken');
const recipesModel = require('../models/RecipesModel');

const secret = 'minhasupersenha';

const missingToken = {
    message: 'missing auth token',
};

const invalidToken = {
    message: 'jwt malformed',
};

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json(missingToken);
    }
    try {
        const { data: { email } } = jwt.verify(token, secret);
        // console.log(id);
        const user = await recipesModel.verifyUser(email);
        // getIdUser = id;
        // return user;
        req.user = user;
        next();
    } catch (err) {
        if (err) {
            return res.status(401).json(invalidToken);
        }
    }
};

module.exports = validateToken;
