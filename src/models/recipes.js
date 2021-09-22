const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewRecipe = async (recipe, insertedId) => {
    console.log(recipe, 'eu aqui');
    const { name, ingredients, preparation, userId } = recipe;
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
    console.log(response.insertedId, response, 'bah');

    return getNewRecipe(response.ops[0], response.insertedId);
};

const getAll = async () => {
    const db = await mongoConnection();
    
    const response = await db.collection('recipes').find({}).toArray();
    return response;
};

const findRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await mongoConnection();
    const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    console.log(response, 'findRecipe response');
    return response;
};

module.exports = { createRecipes, getAll, findRecipe }; 