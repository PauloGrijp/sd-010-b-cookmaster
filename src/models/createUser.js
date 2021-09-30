const { dbCaller } = require('./db');

const createUser = async ({ name, email, password }) => {
    const conn = await dbCaller();
    const role = 'user';
    const create = await conn.collection('users').insertOne({ name, email, password, role });
    return create.ops[0]; // refer to mongo manual in case of doubt
};

module.exports = createUser;
