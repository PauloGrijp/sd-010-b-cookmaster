const loginService = require('../services/LoginService');

const goLogin = async (req, res) => {
    const { email, password } = req.body;

    const validateEmail = await loginService.validateEmail(email);
    if (validateEmail) {
        return res.status(401).json(validateEmail);
    }
    const validatePass = await loginService.validatePassword(password);
    if (validatePass) {
        return res.status(401).json(validatePass);
    }

    const showToken = await loginService.doLogin(email, password);
    return res.status(200).json(showToken);
};

module.exports = {
    goLogin,
};
