// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const users = await db.collection('recipes').find().toArray();
    return users;
};

const create = async (recipe, id) => {
    const newRecipe = { ...recipe, userId: id };
    const db = await connection();
    const userCreated = await db.collection('recipes').insertOne(newRecipe);
    return {
        _id: userCreated.insertedId,
        ...newRecipe,
    };
};

module.exports = {
    create,
    getAll,
};