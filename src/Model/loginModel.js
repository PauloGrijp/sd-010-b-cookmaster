const connection = require('./connection');

const getByEmail = async (user) => {
    const { email } = user;
    console.log(user);
    const db = await connection();
    const users = await db.collection('users').findOne({ email });
    // console.log(users);
    delete users.password;
    return { users };
};
module.exports = { getByEmail };