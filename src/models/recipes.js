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
    const { name, ingredients, preparation, userId } = recipe;
console.log(recipe, 'create recipes');
    const db = await mongoConnection();
    
    const response = await db
    .collection('recipes').insertOne({ name, ingredients, preparation, userId });

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
    // console.log(response, 'findRecipe response');
    return response;
};

const updateRecipe = async (id, recipe) => {
    const { name, ingredients, preparation } = recipe;
    console.log('updateProduct', recipe, id, 'id');

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
    console.log('recipe item', recipeItem);
    return getNewRecipe(recipeItem, id);
};

module.exports = { createRecipes, getAll, findRecipe, updateRecipe }; 