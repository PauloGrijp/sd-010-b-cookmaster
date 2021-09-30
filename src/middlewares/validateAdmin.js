const StatusCodes = require('http-status-codes');

const validateAdmin = (req, res, next) => {
    const { role } = req.user;
  if (!role) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'role not found' });
  }
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  next();
};

module.exports = validateAdmin;