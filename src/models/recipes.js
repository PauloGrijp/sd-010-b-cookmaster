// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewRecipe = async (recipe) => {
    // console.log(id, name);
    const { name, ingredients, preparation, userId, insertedId } = recipe;
      return ({ 
        recipe: {
            name, 
            ingredients,
            preparation,
            userId,
            _id: insertedId,
        },
    });
};
const createRecipes = async (recipe) => {
    const { name, ingredients, preparation, authorization } = recipe;

    const db = await mongoConnection();
    
    const response = await db
    .collection('recipes').insertOne({ name, ingredients, preparation, userId: authorization });

    return getNewRecipe(response);
};

module.exports = { createRecipes };