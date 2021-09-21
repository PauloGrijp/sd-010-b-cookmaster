const { StatusCodes } = require('http-status-codes');

const checkValues = (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }
  
  next();
};

module.exports = { checkValues };
