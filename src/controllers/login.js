const httpCodes = require('../constants/httpCodes.json');
const { loginService } = require('../services');

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.loginUserSvc({ email, password });
    return res.status(httpCodes.HTTP_OK).json({ token });
  } catch (error) {
    next(error);
  }
};
