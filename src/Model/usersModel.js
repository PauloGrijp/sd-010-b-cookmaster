// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const userExists = async (email) => {
    const db = await connection();

    const findUser = await db.collection('users').findOne({ email });
    if (findUser) return true;
    return false;
};

const getAll = async () => {
    const db = await connection();
    const users = await db.collection('users').find().toArray();
    return users;
};

const create = async (user) => {
    const newUser = { ...user, role: 'user' };
    const db = await connection();
    const userCreated = await db.collection('users').insertOne(newUser);
    return {
        _id: userCreated.insertedId,
        name: user.name,
        email: user.email,
        role: 'user',
    };
};

module.exports = {
    getAll,
    create,
    userExists,
};