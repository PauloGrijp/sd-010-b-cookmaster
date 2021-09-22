const invalidEntries = { message: 'Invalid entries. Try again.' };

module.exports = async (req, res, next) => {
  const { token } = req.Authorization;
  console.log(token);
  if (!token) { return res.status(401).json(invalidEntries); }
  next();
};
