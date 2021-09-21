const rescue = require('express-rescue');
const Services = require('../services');

const find = rescue(async (req, res, next) => {
  const { id } = req.params;
  const file = await Services.image.find(id);

  if (!file) return next({ notFound: true });

  res.status(200).download(file);
});

module.exports = { find };