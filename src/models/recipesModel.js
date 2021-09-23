const connection = require('./connection');

const myCollection = 'users';

const createNewRecipe = async (name, ingredients, preparation, userId) => {
    const db = await connection();
            const newRecipeRegistered = await db.collection(myCollection)
            .insertOne({ name, ingredients, preparation, userId });
            return newRecipeRegistered.ops[0];
};

module.exports = {
    createNewRecipe,
};