const verificarUsers = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  console.log('aqui');
  next();
};

module.exports = verificarUsers;