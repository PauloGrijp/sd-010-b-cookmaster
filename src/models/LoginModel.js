const connection = require('./connection');

const verifyEmail = async (email) =>
    connection()
        .then((db) => db.collection('users').findOne({ email }));

const verifyPassword = async (email, password) =>
    connection()
        .then((db) => db.collection('users').findOne({ email, password }));

const getUser = async (email, password) =>
    connection()
        .then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
    verifyEmail,
    verifyPassword,
    getUser,
};
