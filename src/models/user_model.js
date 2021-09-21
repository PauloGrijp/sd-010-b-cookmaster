const connection = require('./connection');

const newUsers = async (name, email, password) => {
    const db = await connection();

    const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    // console.log(user);
    const { _id, role } = user.ops[0];

    return { name, email, role, _id };

    // return user.ops[0];
};

module.exports = {
    newUsers,
};