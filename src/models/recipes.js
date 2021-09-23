const connection = require('./connections');

const findRecipes = async () => {
    const db = await connection();
    return db.collection('recipes').find().toArray();
};

const createRecipes = async (info) => {
    const db = await connection();
    return db.collection('recipes').insertOne(info);
};

module.exports = { findRecipes, createRecipes };