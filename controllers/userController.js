const service = require('../services/userService');
const messages = require('../helpers/validationMessages');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await service.createUser({ name, email, password });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    if (result === null) return res.status(409).json(messages.EMAIL_ALREADY_EXISTS);

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

module.exports = {
  createUser,
};