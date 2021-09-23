const connection = require('./connection');

const myCollection = 'recipes';

const createNewRecipe = async (name, ingredients, preparation, userId) => {
    const db = await connection();
            const newRecipeRegistered = await db.collection(myCollection)
            .insertOne({ name, ingredients, preparation, userId });
            return newRecipeRegistered.ops[0];
};

const findAllRecipes = async () => {
    const db = await connection();
    const allRecipes = await db.collection(myCollection)
    .find().toArray();
    return allRecipes;
};

module.exports = {
    createNewRecipe,
    findAllRecipes,
};