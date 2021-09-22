const { code, error } = require('../schema');

const checkInformations = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: error.invalidEntries });
  }

  next();
};

module.exports = {
  checkInformations,
};
