const { ObjectId } = require('mongodb');
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

const getRecipeID = async (id) => {
        const out = await connect()
            .then((db) => db.collection('recipes')
            .findOne({ _id: ObjectId(id) }))
            .then((result) => result);
        return out;
        };

const editOne = async (id, name, ingredients, preparation) => {
            const out = await connect()
                .then((db) => db.collection('recipes')
                .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
                .then((result) => result);
            return out;
            };

module.exports = { createOne, getAll, getRecipeID, editOne };