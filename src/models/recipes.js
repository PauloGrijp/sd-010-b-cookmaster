const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewRecipe = async (recipe, insertedId) => {
    // console.log(recipe, 'eu aqui');
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
    const { name, ingredients, preparation, userId } = recipe;
    const db = await mongoConnection();
    
    const response = await db
    .collection('recipes').insertOne({ name, ingredients, preparation, userId });

    return getNewRecipe(recipe, response.insertedId);
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
    // console.log(response, 'findRecipe response');
    return response;
};

const updateRecipe = async (id, recipe) => {
    const { name, ingredients, preparation } = recipe;

    const db = await mongoConnection();
     await db.collection('recipes').updateOne({
        _id: ObjectId(id),  
    }, {
        $set: {
            name, 
            ingredients, 
            preparation,
        },
    });

    const recipeItem = await findRecipe(id);
    return getNewRecipe(recipeItem, id);
};

const deleteRecipe = async (id) => {
    const db = await mongoConnection();
    return db.collection('recipes').deleteOne({
        _id: ObjectId(id),
    });
};
module.exports = { createRecipes, getAll, findRecipe, updateRecipe, deleteRecipe }; 