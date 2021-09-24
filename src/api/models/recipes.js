const connect = require('./connect');

const createOne = async (name, ingredients, preparation, userId) => {
    const out = await connect()
        .then((db) => db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }))
        .then((result) => result.ops[0]);
    return out;
    };

const getAll = async () => {
    const out = await connect()
        .then((db) => db.collection('recipes')
        .find({}).toArray())
        .then((result) => result);
    return out;
    };

module.exports = { createOne, getAll };