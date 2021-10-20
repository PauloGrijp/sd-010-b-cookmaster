const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'recipes';

const createItem = async (name, ingredients, preparation) => {
    const recipes = await connection()
        .then((db) => db.collection(COLLECTION)
        .insertOne({ name, ingredients, preparation }));
    
    return {
        recipe: {
            name,
            ingredients,
            preparation,
            _id: recipes.insertedId,
        },
    };
};

const getAll = async () => {
    const recipes = await connection()
        .then((db) => db.collection(COLLECTION)
        .find()
        .toArray());
    
    return recipes;
};

const getRecipesById = async (id) => {
    const recipe = await connection()
        .then((db) => db.collection(COLLECTION)
        .findOne({ _id: ObjectId(id) }));

    return recipe;
}

module.exports = {
    createItem,
    getAll,
    getRecipesById,
};