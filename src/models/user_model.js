const jwt = require('jsonwebtoken');
const connection = require('./connection');

const SECRETKEY = '123456789';

const newUsers = async (name, email, password) => {
    const db = await connection();

    const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    // console.log(user);
    const { _id, role } = user.ops[0];

    return { name, email, role, _id };

    // return user.ops[0];
};

const login = async (email, password) => {
    const db = await connection();

    const user = await db.collection('users').findOne({ email, password });

    return user;
};

const LoginToken = async (email, password) => {
    const user = await login(email, password);

    if (!user) return { message: 'Incorrect username or password' }; 
    
    const { _id } = user;

    const token = jwt.sign(
        {
            userId: _id,
            email,
        },
        SECRETKEY,
        {
            expiresIn: 1440, // 24h
        },

    );

    return { token };
};

module.exports = {
    newUsers,
    LoginToken,
};