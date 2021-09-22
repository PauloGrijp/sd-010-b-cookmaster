const userModel = require('../models/usersModel');

const STATUS_OK = {
    OK: 200,
};

const loginUser = async (req, res) => {
    const { name, email } = req.body;

   return res.status(STATUS_OK.OK).json();
};

module.exports = {
    loginUser,
};