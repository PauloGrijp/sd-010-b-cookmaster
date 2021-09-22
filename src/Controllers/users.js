const { addUser, userLogin } = require('../services/users');

const requestNewUser = async (req, res) => {
  const { name, email, password } = req.body;  

  const newUser = await addUser(email, password, name);

  if (newUser.message) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return res.status(201).json(newUser);
};

const requestLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userLogin(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  return res.status(200).json({ token: user });
};

module.exports = {
  requestNewUser,
  requestLogin,
};
