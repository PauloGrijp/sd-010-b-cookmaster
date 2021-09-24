const { ObjectId } = require('mongodb');
const connection = require('./connections');

const findRecipes = async () => {
    const db = await connection();
    return db.collection('recipes').find().toArray();
};

const findRecipesById = async (id) => {
    const db = await connection();
    return db.collection('recipes').findOne(ObjectId(id));
};

const updateRecipesById = async (id, name, ingredients, preparation) => {
    const db = await connection();
    return db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, 
    { $set: { name, ingredients, preparation, userId: ObjectId(id) } });
};

const createRecipes = async (info) => {
    const db = await connection();
    return db.collection('recipes').insertOne(info);
};

module.exports = { findRecipes, createRecipes, findRecipesById, updateRecipesById };