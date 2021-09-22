// const { addUser } = require('../services/users');

const requestNewUser = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  // const newUser = await addUser(email, password, name);

  return res.send('oi');
};

module.exports = {
  requestNewUser,
};
