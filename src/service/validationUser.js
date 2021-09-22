const { getUserByEmail } = require('../model/usersModel');

let err;

const validateEmailExist = async (email, res) => {
    const user = await getUserByEmail(email);
    if (user) {
        err = { message: 'Email already registered' };
        res.status(409).json(err);
    }
};

module.exports = { validateEmailExist };