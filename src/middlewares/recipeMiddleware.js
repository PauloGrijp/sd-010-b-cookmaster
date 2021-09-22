const httpStatus = require('../controller/httpStatus')

const verifyRecipeBody = (req, res) => {

};

const verifyToken = (req, res) => {
  try {
    
  } catch (e) {
    return res.status(httpStatus.unauthorized).json({
      message: 'jwt malformated.',
    })
  }
};

module.exports = {
  verifyRecipeBody,
  verifyToken,
};
