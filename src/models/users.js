const connection = require('./connection');

const createUser = async (userData) => {
    const db = await connection();
    const result = await db.collection('users').insertOne({ ...userData, role: 'user' });
    const { name, email, role, _id } = result.ops[0];
    return { user: { name, email, role, _id } };
};

const findEmail = async (email) => {
    const db = await connection();
    const result = await db.collection('users').findOne({ email });
    return result;
};

const findUser = async (user) => {
    const db = await connection();
    const result = await db.collection('users').findOne({ user });
    return result;
};

const createAdmin = async (adminData) => {
    const db = await connection();
    const result = await db.collection('users').insertOne({ ...adminData });
    const { name, email, role, _id } = result.ops[0];
    return { user: { name, email, role, _id } };
};

module.exports = {
    createUser,
    findEmail,
    findUser,
    createAdmin,
};
