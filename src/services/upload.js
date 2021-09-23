const models = require('../models');

const upload = async (url, id, userId, role) => {
  if (role !== 'admin') return models.upload(url, id, userId);
  return models.uploadAdmin(url, id);
};

module.exports = upload;