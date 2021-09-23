const jwt = require('jsonwebtoken');
const { createRecipe } = require('../services/recipes');

const secret = '12345';

const create = async (req, res) => {
    const token = req.headers.authorization;
    const { name, ingredients, preparation } = req.body;

    const { id } = jwt.verify(token, secret);
    console.log(token)
    const result = await createRecipe(name, ingredients, preparation, id);
    return res.status(201).json({ recipe: { ...result, userId: id } });
};

module.exports = { create };