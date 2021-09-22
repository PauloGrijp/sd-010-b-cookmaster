const {
  servUserReg,

 } = require('../services/userService');

const contUserReg = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await servUserReg({ name, email, password });
 return res.status(result.code).json(result.users);
};

module.exports = {
  contUserReg,
};