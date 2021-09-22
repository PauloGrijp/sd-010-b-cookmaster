// const { ObjectId } = require('mongodb');
const connectionDB = require('./connection');

/* 
FOLLOWING CRUD
    |__ CREATE
    |__ READ
    |__ UPDATE
    |__ DELETE

*/

// CREATE
const add = async (name, email, password) => {
  const db = await connectionDB.connect();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return { user: {
    name,
    email,
    role: 'user',
    _id: user.insertedId,
    },
  };
};

const existEmail = async (email) => {
  const db = await connectionDB.connect();
  const emailFound = await db.collection('users').findOne({ email });
  return emailFound;
};

const getUser = async (email, password) => {
  const db = await connectionDB.connect();
  const userFound = await db.collection('users').findOne({ email, password });
  return userFound;
};

module.exports = {
    add, existEmail, getUser,
};