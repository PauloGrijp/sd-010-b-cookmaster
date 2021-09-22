const jwt = require('jsonwebtoken');
const connection = require('./connection');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (body) => {
  const data = await connection()
    .then((db) => db.collection('users').insertOne(body));
  return data;
};

const getByEmail = async (email) => {
  const login = await connection()
  .then((db) => db.collection('users').findOne({ email }));
  return login;
};

const getByPass = async (password) => {
  const pass = await connection()
  .then((db) => db.collection('users').findOne({ password }));
  return pass;
};

const createToken = async (body) => jwt.sign({ data: body }, secret, jwtConfig);

module.exports = {
  create,
  getByEmail,
  createToken,
  getByPass,
};