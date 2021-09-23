const jwt = require('jsonwebtoken');
const { verify } = require('sinon');

const SECRET = '123456'
const validateToken = (req, res,next ) => {
  const { authorization } = req.headers;
  try{
    const payload = jwt.verify(token,SECRET)
  }catch(err)
};