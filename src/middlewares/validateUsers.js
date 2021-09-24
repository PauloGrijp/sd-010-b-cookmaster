const validateUsers = (req, res, next) => {
 const { name, email, password } = req.body;

 if (!name || !email || !password) {
   return res.status(400).json({ message: 'Invalid entries. Try again.' });
 }
 next();
};

module.exports = validateUsers;