const services = require('../services/users');

const create = async (req, res) => {
  try {
    const usuario = req.body;

    const user = await services.create(usuario);

    res.status(201).json({ user });
  } catch (error) {
    return res.status(error.err.code).json({ message: error.err.message });
  }
};

module.exports = {
  create,
};
