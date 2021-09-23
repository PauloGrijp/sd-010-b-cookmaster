const jwt = require('jsonwebtoken');
const modelUser = require('../models/modelUsers');

const secret = 'segredojwt';

const err = (statusCode) => ({ statusCode });

const INVALID_ENTRIES = 'invalidEntries';
const EMAIL_REGISTRED = 'emailRegistred';
const LOGIN_NOT_FILLED = 'loginNotFilled';
const LOGIN_INCORRECT = 'loginIncorrect';
const MISSING_TOKEN = 'missingToken';
const JWT_MALFORMED = 'jwtMalformed';

const userName = (name) => {
  if (!name || typeof name !== 'string') throw err(INVALID_ENTRIES);
};

const userPassword = (password) => {
  if (!password || typeof password !== 'string') throw err(INVALID_ENTRIES);
};

const userEmail = (email) => {
  if (!email || typeof email !== 'string') throw err(INVALID_ENTRIES);
};

const userEmailIsValid = (email) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!validEmail) throw err(INVALID_ENTRIES);
};

const userEmailAlreadyExist = async (email) => {
  const response = await modelUser.getByEmail(email);
  if (response) throw err(EMAIL_REGISTRED);
};

const loginEmailPassword = (email, password) => {
  if (!email || typeof email !== 'string') throw err(LOGIN_NOT_FILLED);
  if (!password || typeof password !== 'string') throw err(LOGIN_NOT_FILLED);
};

const loginConfirmUser = async (email, password) => {
  const response = await modelUser.getByEmail(email);
  if (!response) throw err(LOGIN_INCORRECT);
  const confirm = response.password === password;
  if (!confirm) throw err(LOGIN_INCORRECT);
};

const validToken = async (req, _res) => {
  const token = req.headers.authorization;
  if (!token) throw err(MISSING_TOKEN);

  const payload = jwt.verify(token, secret);
  if (!payload) throw err(JWT_MALFORMED);

  const { _id } = await modelUser.getByEmail(payload.email);
  return _id;
};

module.exports = {
  userName,
  userPassword,
  userEmail,
  userEmailIsValid,
  userEmailAlreadyExist,
  loginEmailPassword,
  loginConfirmUser,
  validToken,
};
