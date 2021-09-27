// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const verifyUser = async (email) =>
    connection()
        .then((db) => db.collection('users').findOne({ email }))
        .then((re) => re);

const addNewRecipes = async (name, ingredients, preparation) =>
    connection()
        .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

module.exports = {
    addNewRecipes,
    verifyUser,
};
