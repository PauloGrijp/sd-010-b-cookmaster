const { StatusCodes } = require('http-status-codes');
const servicesUsers = require('../services/users');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userData = { name, email, password };
    const result = await servicesUsers.createUser(userData);

    if (result.errorType === 'bad_request') {
        return res.status(StatusCodes.BAD_REQUEST).json(result.error);
    }
    if (result.errorType === 'conflict') {
        return res.status(StatusCodes.CONFLICT).json(result.error);
    }

    return res.status(StatusCodes.CREATED).json(result);
};

const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const { role } = req;
    const adminData = { name, email, password, role };
    const result = await servicesUsers.createAdmin(adminData);
    if (result.errorType === 'forbidden') {
        return res.status(StatusCodes.FORBIDDEN).json(result.error);
    }
    return res.status(StatusCodes.CREATED).json(result);
};

module.exports = {
    createUser,
    createAdmin,
};
