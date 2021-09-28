const connection = require('./connection');

const verifyEmailAndPassword = async (email, password) =>
    connection()
        .then((db) => db.collection('users').findOne({ email, password }));

// const verifyPassword = async (password) =>
//     connection()
//         .then((db) => db.collection('users').findOne({ password }));

const getUser = async (email, password) =>
    connection()
        .then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
    verifyEmailAndPassword,
    // verifyPassword,
    getUser,
};
