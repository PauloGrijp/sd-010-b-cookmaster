const multer = require('multer');

const RecipesSchema = require('../schemas/recipesSchema');

const validateInputs = (req, res, next) => {
  const recipe = req.body;
  const { code, message } = RecipesSchema.validate(recipe);

  if (code) {
    return res.status(code).json({ message });
  }

  next();
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploads = multer({ storage });

module.exports = {
  validateInputs,
  uploads,
};
