const model = require('../models/loginModel');
const { generateToken } = require('../token/token');
const { checkCredentials, validCredentials } = require('../utils/validate');

async function checkUserEmail(body) {
  const { email, password } = body;
  validCredentials(email, password);
  const user = await model.checkUserEmail(email);
  checkCredentials(user, password);
  const { _id } = user;
  const token = generateToken({ 
    id: _id,
    email: user.email,
    role: user.role,
   });
  return token;
}

module.exports = {
  checkUserEmail,
};