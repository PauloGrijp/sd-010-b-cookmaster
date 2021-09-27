const services = require('../services/users');

const create = async (req, res) => {
  try {
    const user = req.body;

    const service = await services.create(user);

    res.status(201).json(service);
  } catch (error) {
    return res.status(error.err.code).json({ message: error.err.message });
  }
};

module.exports = {
  create,
};
