const connection = require('./connection');

const verifyIfEmailAlreadyExists = async (email) =>
    connection()
        .then((db) => db.collection('users').findOne({ email }))
        .then((re) => {
            console.log(re, 'estive aqui');
            if (re) {
                return true;
            }
            return false;
        });

const addNewUser = async (name, email, password) =>
    connection()
        .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
        .then((re) => ({ name, email, role: 'user', _id: re.insertedId }));

module.exports = {
    addNewUser,
    verifyIfEmailAlreadyExists,
};
