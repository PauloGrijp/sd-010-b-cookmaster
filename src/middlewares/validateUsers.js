const validateUsers = (req, res, next) => {
 const { name, email, password, role } = req.body;

 if (!name || !email || !password || !role) {
   return res.status(400).json({ message: 'Invalid entries. Try again.' });
 }
 
 next();
};

module.exports = { validateUsers };