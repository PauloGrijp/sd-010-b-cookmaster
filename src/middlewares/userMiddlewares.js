const connection = require('../models/mongoConnection');

const message = 'Invalid entries. Try again.';

const validEmail = (request, response, next) => {
  try {
    const { email } = request.body;
    if (!email 
      || !email.includes('@') || !email.includes('.com')) {
      return response.status(400).json({ message });
    }
    next();
  } catch (error) {
    return response.status(400).json({ message });
  }
};

const validName = (request, response, next) => {
  try {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ message });
    }
    next();
  } catch (error) {
    return response.status(400).json({ message });
  }
};

const validPassword = (request, response, next) => {
  try {
    const { password } = request.body;
    if (!password) {
      return response.status(409).json({ message });
    }
    next();
  } catch (error) {
    return response.status(409).json({ message });
  }
};

const validUser = async (request, response, next) => {
  const { email } = request.body;
  const db = await connection();   
  const user = await db.collection('users').findOne({ email });
  if (user) { return response.status(409).json({ message: 'Email already registered' }); }    
  next();
};

module.exports = { validEmail, validName, validPassword, validUser };