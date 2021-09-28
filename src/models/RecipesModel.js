// const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const verifyUser = async (email) =>
    connection()
        .then((db) => db.collection('users').findOne({ email }))
        .then((re) => re);

const addNewRecipes = async (name, ingredients, preparation, userId) =>
    connection()
        .then((db) => db.collection('recipes')
            .insertOne({ name, ingredients, preparation, userId }));

const getAllRecipes = async () =>
    connection()
        .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) =>
    connection()
        .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));    

const updateRecipe = async (id, name, ingredients, preparation) =>
    connection()
        .then((db) => db.collection('recipes')
            .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

module.exports = {
    addNewRecipes,
    verifyUser,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
};
