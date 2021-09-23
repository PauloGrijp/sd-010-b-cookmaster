module.exports = (err, _req, res, _next) => {
  switch (err) {
    case 'userAndRecipes':
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    case 'login':
      return res.status(401).json({ message: 'All fields must be filled' });
    case 'passwordOrLogin':
      return res.status(401).json({ message: 'Incorrect username or password' });
    case 'alreadyRegistered':
      return res.status(409).json({ message: 'Email already registered' });
  default:
      break;
  }
};