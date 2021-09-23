const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const db = await connection();

    const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

    return recipe.ops[0];
};

const listRecipes = async () => {
    const db = await connection();
    
    const recipes = await db.collection('recipes').find().toArray();

    return recipes;
};

module.exports = {
    createRecipe,
    listRecipes,
};