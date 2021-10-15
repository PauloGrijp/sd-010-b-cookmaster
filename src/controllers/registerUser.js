const { inValidUserData, emailAlreadyRegistered,
  createNewUser } = require('../services/userServices');

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (inValidUserData(email, name, password)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }

  const alreadyRegistered = await emailAlreadyRegistered(email);
  if (alreadyRegistered) {
    return res.status(400).json({ message: 'Email already registered' }); 
  }

  const newUser = await createNewUser(email, name, password);

  return res.status(201).json(newUser);
};

module.exports = {
  registerUser,
};
