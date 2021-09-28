const service = require('../services/loginService');

async function checkUserEmail(req, res) {
  const token = await service.checkUserEmail(req.body);
  return res.status(200).json({ token });
}

module.exports = {
  checkUserEmail,
};