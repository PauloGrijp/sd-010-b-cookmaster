const connection = require('./connection');

const makeLogin = async (email, password) => {
    const db = await connection();
    const result = await db.collection('users').findOne({ email, password });
    return result;
};

module.exports = {
    makeLogin,
};
