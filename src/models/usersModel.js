const connection = require('./connection');

const myCollection = 'users';

const createNewUser = async (name, email, password) => {
    const db = await connection();
            if (name === 'admin') {
                const admin = db.users.insertOne({ name, email, password, role: 'admin' });
                return admin;
            }
            const newUserInserted = await db.collection(myCollection)
            .insertOne({ name, email, password, role: 'user' });
            return newUserInserted.ops[0];
};

const findUserByEmail = async (email) => {
    const db = await connection();
    const userWithEmail = await db.collection(myCollection)
    .findOne({ email });
    return userWithEmail;
};

module.exports = {
    createNewUser,
    findUserByEmail,

};