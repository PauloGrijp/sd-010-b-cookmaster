const {
  servUserReg, servlogin,
 } = require('../services/userService');

const contUserReg = async (req, res) => {
    const userRecive = req.body;
    const result = await servUserReg(userRecive);
    if (result.err) {
      const { code, err } = result;
      return res.status(code).json(err);
    }
    const { code, user } = result;
 return res.status(code).json({ user });
};

const contLogin = async (req, res) => {
  const login = req.body;
  const result = await servlogin(login);
    if (result.err) {
      const { code, err } = result;
      return res.status(code).json(err);
    }
    const { code, token } = result;
    console.log(token, 'control');
 return res.status(code).json({ token });
};

module.exports = {
  contUserReg,
  contLogin,
};