const { ObjectId } = require('mongodb');
const connection = require('./connections');

const findRecipes = async () => {
    const db = await connection();
    return db.collection('recipes').find().toArray();
};

const findRecipesById = async (id) => {
    const db = await connection();
    const data = await db.collection('recipes').findOne(ObjectId(id));
    console.log(data, 'model');
    return data;
};

const createRecipes = async (info) => {
    const db = await connection();
    return db.collection('recipes').insertOne(info);
};

module.exports = { findRecipes, createRecipes, findRecipesById };