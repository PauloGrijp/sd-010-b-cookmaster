// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewUser = async (id, name, email) => 
    // console.log(id, name);
      ({ 
        user: {
            name, 
            email,
            role: 'user',
            _id: id,
        },
    });
const createUser = async (name, email, password) => mongoConnection()
.then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
.then((result) => getNewUser(result.insertedId, name, email));

const findUser = async (email) => mongoConnection()
.then((db) => db.collection('users').findOne({ email }))
.then((result) => result);

module.exports = { createUser, findUser };