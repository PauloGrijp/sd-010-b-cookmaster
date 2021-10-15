const { inValidUserData, emailAlreadyRegistered,
  createNewUser } = require('../services/userServices');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (inValidUserData(name, email, password)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }

  const alreadyRegistered = await emailAlreadyRegistered(email);
  if (alreadyRegistered) {
    return res.status(409).json({ message: 'Email already registered' }); 
  }

  const newUser = await createNewUser(name, email, password);

  return res.status(201).json(newUser);
};

const registerNewAdmin = async (req, res) => {
  const { user, body: { name, email, password } } = req;

  if (user.role !== 'admin') {
    return res
      .status(403).json({ message: 'Only admins can register new admins' }); 
  }

  if (inValidUserData(name, email, password)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }

  const alreadyRegistered = await emailAlreadyRegistered(email);
  if (alreadyRegistered) {
    return res.status(409).json({ message: 'Email already registered' }); 
  }

  const role = 'admin';

  const newUser = await createNewUser(name, email, password, role);

  return res.status(201).json(newUser);
};

module.exports = {
  registerUser,
  registerNewAdmin,
};
