const connection = require('./connection');

const COLLECTION = 'users';

const login = async (email, password) => {
    const getLogin = await connection()
        .then((db) => db.collection(COLLECTION)
        .findOne({ email, password }));
    
    return getLogin;
}

module.exports = {
    login,
}