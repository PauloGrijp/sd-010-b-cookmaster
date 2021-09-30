const StatusCodes = require('http-status-codes');
const UserService = require('../services/UserService');

const verifyRole = (role, path) => {
  console.log(path, 'verificação');
  if (path.includes('admin')) {
      return 'admin';
  }
  return 'user';
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { path } = req;
  console.log(path);
  
  const { id, message } = await UserService.createUser({ name, email, password, role });
  
  if (message === 'Invalid entries. Try again.') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message,
  });
  }
  if (message === 'Email already registered') {
    return res.status(StatusCodes.CONFLICT).json({
      message,
    });
  }

  const userRole = verifyRole(role, path);

  res.status(StatusCodes.CREATED).json({ user: {
    name, email, role: userRole, _id: id,
  } });
};

module.exports = {
  createUser,
};
