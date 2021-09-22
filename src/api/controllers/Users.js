const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    CONFLICT,
    INTERNAL_SERVER_ERROR,
  },
} = require('http-status-codes');
const Users = require('../services/Users');

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    const newUser = await Users.createUser(name, email, password);
    console.log(newUser);

    if (newUser.conflict) return res.status(CONFLICT).json({ message: newUser.message });
    if (newUser.message) return res.status(BAD_REQUEST).json(newUser);

    return res.status(CREATED).json(newUser);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send('Something went wrong');
  }
};

module.exports = {
  createUser,
};
