// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const userExists = async (user) => {
    const { email } = user;
    const db = await connection();
    const product = await db.collection('users').findOne({ email });

    return product !== null;
};

const getAll = async () => {
    const db = await connection();
    const users = await db.collection('users').find().toArray();
    return users;
};

const create = async (user) => {
   const db = await connection();
   const userCreated = await db.collection('users').insertOne(user);
   return { _id: userCreated.insertedId, ...user };
};

module.exports = { 
    getAll,
    create,
    userExists,
 };