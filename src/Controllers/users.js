const { addUser } = require('../services/users');

const requestNewUser = async (req, res) => {
  const { name, email, password } = req.body;  

  const newUser = await addUser(email, password, name);

  return res.status(201).json(newUser);
};

module.exports = {
  requestNewUser,
};
