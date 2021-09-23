const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getAllUsers = async () => {
  try {
    const allUsers = await connection()
      .then((db) => db.collection('users').find().toArray())
      .then((result) => result);
    return allUsers;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

const getUserById = async (id) => {
  try {
    const user = await connection()
      .then((db) => db.collection('users').findOne(ObjectId(id)))
      .then(({ _id, name, email, role }) => ({
          _id,
          name,
          email,
          role,
        }));
    return user;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

const registerNewUser = async (name, email, password) => {
  try {
    const addedUser = await connection()
      .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
      .then((result) => ({
          _id: result.insertedId,
          name,
          email,
          role: 'user',
      }));
    return addedUser;
  } catch (err) {
    return {
      isErrorMessage: err,
    };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerNewUser,
};
