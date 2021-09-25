// const multer = require('multer');
// const path = require('path');
const serviceMulter = require('../services/multerServices');

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.join(__dirname, '..', 'uploads'));
//   },
//   filename: (req, file, callback) => {
//     callback(null, `/src/uploads/${req.params.id}.jpeg`);
//   },
// });

// const upload = multer({ storage });

const createFile = async (req, res) => res.status(200).json('ola');
  // const { id } = req.params;
  // const { authorization: token } = req.headers;
  // const result = await serviceMulter.createFile(token, id);
  // return res.status(200).json(result);

module.exports = {

  createFile,
};