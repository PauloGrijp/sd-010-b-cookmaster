const { userServices } = require('../services');
const httpCodes = require('../constants/httpCodes.json');
const errorMessages = require('../constants/errorMessages.json');
const { AppError } = require('../errorHandler');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userServices.createUserSvc({ name, email, password });
    const { password: _, ...userWithoutPassword } = newUser.ops[0];
    return res.status(httpCodes.HTTP_CREATED).json({ user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError(httpCodes.HTTP_FORBIDDEN, errorMessages.ADMIN_ONLY);
    }
    const { name, email, password } = req.body;
    const newUser = await userServices.createAdminSvc({ name, email, password });
    const { password: _, ...userWithoutPassword } = newUser.ops[0];
    return res.status(httpCodes.HTTP_CREATED).json({ user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};
