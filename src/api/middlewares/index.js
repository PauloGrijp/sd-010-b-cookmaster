const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) =>
    callback(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});
// usamos o storage para adicionar duas callbacks necessárias para ajustar o path (caminho) da pasta de
// uploads de forma adapdativa para qualquer sistema operacional e também para ajustar o nome do 
// arquivo com base nas regras de negócio.

const upload = multer({ storage });

module.exports = upload;
