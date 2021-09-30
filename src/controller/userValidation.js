// This file validates my user info

const { dbCaller } = require('../models/db');

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCheck = (email) => regex.test(email); // check regex 
const cogitoErgoSum = (name, email, password) => !name || !password || !email; // check if null

// look for email on db
const emailCheck = async ({ email }) => {
    const conn = await dbCaller();
    const alreadyExist = await conn.collection('users').findOne({ email });
    return alreadyExist;
};

// doing all of the user validations defined above
const userCheck = async ({ name, email, password }) => {
    if (cogitoErgoSum(name, email, password)) {
    return { 
        code: 400,
        message: 'Invalid entries. Try again.',
        };
    }
    if (await emailCheck({ email })) return { code: 409, message: 'Email already registered' }; // if true return oject, else nothing
    if (!regexCheck(email)) return { code: 400, message: 'Invalid entries. Try again.' };
};

module.exports = {
    userCheck,
};
