const connection = require('./connections');

const createUser = async (infoUser) => {
    const db = await connection();
    console.log(infoUser, 'infoUsermodels');
    const data = await db.collection('users').insertOne({ ...infoUser, role: 'user' });
    console.log(data.ops[0]);
    return data;
};

const findUser = async (email) => {
    const db = await connection();
    return db.collection('users').findOne({ email });
};

module.exports = { createUser, findUser };
