const { ObjectId } = require('mongodb');
const { code, error } = require('../schema');

const checkInformations = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: error.invalidEntries });
  }

  next();
};

const checkAuthentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(code.HTTP_UNAUTHORIZED).json({ message: error.noAuthentication });
  }

  next();
};

const mongoValid = (req, res, next) => {
  const { id } = req.params;

  if (ObjectId.isValid(id) === false) {
    return res.status(code.HTTP_NOT_FOUND).json({ message: error.notFound });
  }

  next();
};

module.exports = {
  checkInformations,
  checkAuthentication,
  mongoValid,
};
