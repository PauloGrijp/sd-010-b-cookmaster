const connection = require('./connection');

const COLLECTION = 'recipes'

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
        }
    }
}

const getAll = async () => {
    const recipes = await connection()
        .then((db) => db.collection(COLLECTION)
        .find()
        .toArray());
    
    return recipes;
}

module.exports = {
    createItem,
    getAll,
}