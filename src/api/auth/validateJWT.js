const jwt = require('jsonwebtoken');
const model = require('../../models/user');

const segredo = 'secretToken';
const invalidEntries = { message: 'Invalid entries. Try again.' };
const missingAuth = { message: 'missing auth token' };

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(missingAuth);
  }
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await model.findUser(decoded.data.name);
    if (!user) {
      return res.status(401).json(invalidEntries);
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};