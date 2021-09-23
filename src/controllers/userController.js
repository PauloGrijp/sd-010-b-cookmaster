const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.createUser({ name, email, password });
    // console.log(result);
    if (result.erro) {
      return res.status(result.erro.code).json({ message: result.erro.message });
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Deu ruim' });
  }
};

module.exports = { createUser };
