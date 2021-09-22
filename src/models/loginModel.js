const connection = require('./connection');

const myCollection = 'users';

const findUserByEmail = async (email) => {
    const db = await connection();
    const userWithEmail = await db.collection(myCollection)
    .findOne({ email });
    return userWithEmail;
};

module.exports = {
    findUserByEmail,

};