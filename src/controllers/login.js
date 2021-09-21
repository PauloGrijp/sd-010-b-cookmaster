const { StatusCodes } = require('http-status-codes');
const servicesLogin = require('../services/login');

const makeLogin = async (req, res) => {
    const { email, password } = req.body;
    const result = await servicesLogin.makeLogin(email, password);
    if (result.errorType === 'unauthorized - empty field') {
        return res.status(StatusCodes.UNAUTHORIZED).json(result.error);
    }
    if (result.errorType === 'unauthorized incorrect data') {
        return res.status(StatusCodes.UNAUTHORIZED).json(result.error); 
}
    return res.status(StatusCodes.OK).json(req.token);
};

module.exports = {
    makeLogin,
};
