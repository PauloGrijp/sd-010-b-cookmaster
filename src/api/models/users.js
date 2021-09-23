const connect = require('./connect');

const createOne = async (name, email, password, role) => {
    const out = await connect()
        .then((db) => db.collection('users')
        .insertOne({ name, email, password, role }))
        .then((result) => result.ops[0]);
    return out;
    };

const findUser = async (email) => {
    const out = await connect()
        .then((db) => db.collection('users')
        .findOne({ email }))
        .then((result) => result);
    return out;
};

module.exports = { createOne, findUser };