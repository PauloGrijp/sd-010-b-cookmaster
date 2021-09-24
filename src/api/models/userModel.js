const connection = require('./connection');

const getUserByEmail = async (email) => {
    const db = await connection();
    const result = await db.collection('users').findOne({ email });
    return result;
  };

const createNewUser = async (name, email, password) => {
// const dbCon = await connection.execute;
    const dbCon = await connection();
    const returnUser = await dbCon.collection('users').insertOne({
        name, email, password, role: 'user',
    });
    return { user: returnUser[0] };
};

module.exports = {
    getUserByEmail,
    createUser,
};
