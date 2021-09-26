const multer = require('multer');
// const recipesServices = require('../services/recipesServices');
// const path = require('path');
 const serviceMulter = require('../services/multerServices');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const validFile = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const { id } = req.params;
  await serviceMulter.validCreateFile(token, id);
  next();
  // const result = await serviceMulter.validCreateFile(id);
  return res.status(200).json('result');
};

// const createFileImg = async (req, res) => {
//   const { id } = req.params;
// };

module.exports = {
  upload,
  validFile,

};