const multer = require('multer');
const path = require('path');
const { findRecipesById } = require('../models/recipes');

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => { 
      callback(null, path.join(__dirname, '..', 'uploads')); 
},
    filename: (req, _file, callback) => { callback(null, `${req.params.id}.jpeg`); },
  });
const upload = multer({ storage });

// Renato, Carlos e Diegho me ajudaram no requisito 9;
const createUpload = [upload.single('image'), async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  if (!token) {
      return res
      .status(401)
      .json({ message: 'missing auth token' });
  }
  const image = path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`);
  const result = await findRecipesById(id);
  return res.status(200).json({ ...result, image, userId: id });
}];

module.exports = createUpload;