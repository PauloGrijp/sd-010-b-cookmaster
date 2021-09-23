const {
  servUserReg,
 } = require('../services/userService');

const contUserReg = async (req, res) => {
    const userRecive = req.body;
    const result = await servUserReg(userRecive);
    if (result.err) {
      const { code, err } = result;
      return res.status(code).json(err);
    }
    const { code, user } = result;
    console.log(user, 'control');
 return res.status(code).json({ user });
};

module.exports = {
  contUserReg,
};