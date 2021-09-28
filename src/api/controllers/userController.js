const service = require('../services/userService');

async function create(req, res) {
  const result = await service.create(req.body);
  // console.log(result);
  return res.status(201).json(result);
}

module.exports = {
  create,
};