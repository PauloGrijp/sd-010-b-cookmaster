module.exports = (req, res, next) => {
  const { name, email, password } = req.body;
  const user = [name, email, password];
  user.forEach((value) => {
    if (!value || value === '') { 
      return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
    }
  });

  const emailRegex = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!emailRegex.test(email)) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
}
  next();
};
