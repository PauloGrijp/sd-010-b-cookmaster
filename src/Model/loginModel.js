const connection = require('./connection');

const getByEmail = async (user) => {
    const { email } = user;
    console.log(user);
    const db = await connection();
    const users = await db.collection('users').findOne({ email });
    // console.log(users);
    return { name: users.name, email: users.email };
};
module.exports = { getByEmail };