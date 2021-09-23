const services = require('../services');

const upload = async (req, res) => {
  const { id } = req.params;
  const { role, _id: userId } = req.user;
  const URL = `localhost:3000/src/uploads/${id}.jpeg`;
  const fileUpload = await services.upload(URL, id, userId, role);
  return res.status(200).json(fileUpload);
};

module.exports = upload;