const multer = require('multer');
// const recipesServices = require('../services/recipesServices');
// const path = require('path');
 const serviceMulter = require('../services/multerServices');
 const multerModel = require('../models/multerModel');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const createFileImg = async (req, res) => {
  const { id } = req.params;
  const result = await multerModel.createFiledb(id);
  console.log(result, 'result');
  return res.status(200).json(result);
};

const validFile = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  // const { id } = req.params;
  await serviceMulter.validCreateFile(token);
  next();
};

module.exports = {
  upload,
  validFile,
  createFileImg,

};