const { StatusCodes } = require('http-status-codes');
const { jwt, jwtConfiguration, secret } = require('../middlewares/jwtMiddlewares');
const loginService = require('../services/loginServices');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService.userLogin(email, password);
    
    if (user.message) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: user.message });
    }
    
    const { _id } = user;
    
    const token = jwt.sign({ id: _id, email }, secret, jwtConfiguration);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = { userLogin };
