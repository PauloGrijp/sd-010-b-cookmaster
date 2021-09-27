const jwt = require('jsonwebtoken');
const recipesModel = require('../models/RecipesModel');

const secret = 'minhasupersenha';

const errorInvalidEntries = {
    message: 'Invalid entries. Try again.',
};

const invalidToken = {
    message: 'jwt malformed',
};

const validateIfFieldsExists = async (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
        return errorInvalidEntries;
    }
};

let getIdUser = '';

const validateToken = async (token) => {
    try {
        const { data: { id, email } } = jwt.verify(token, secret);
        // console.log(id);
        const user = await recipesModel.verifyUser(email);
        getIdUser = id;
        return user;
    } catch (err) {
        if (err) {
            return invalidToken;
        }
    }
    // const { data: { email } } = jwt.verify(token, secret);
    // // console.log(id);
    // const user = await recipesModel.verifyUser(email);
    // console.log(user);
    // if (!user) {
    //     return invalidToken;
    // }
    // // getIdUser = id;
    // return user;
};

const addRecipes = async (name, ingredients, preparation) => {
    const addRecipe = await recipesModel.addNewRecipes(name, ingredients, preparation);
    return {
        name: addRecipe.ops[0].name,
        ingredients: addRecipe.ops[0].ingredients,
        preparation: addRecipe.ops[0].preparation,
        userId: getIdUser,
        _id: addRecipe.insertedId,
    };
};

module.exports = {
    validateIfFieldsExists,
    validateToken,
    addRecipes,
};
