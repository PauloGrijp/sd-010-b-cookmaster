const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
const errs = require('./err/usersErr');

const secret = 'senha';

const header = {
  algorithm: 'HS256',
};

async function login(req, res) {
  const { email, password } = req.body;

  const user = await usersService.login({ email, password });

  if (user === 'missing fields') return res.status(401).json(errs.ERR_FIELDS);
  if (user === 'wrong data') return res.status(401).json(errs.ERR_DATA_LOGIN);

  const { _id, role } = user;
  const payload = { _id, role, email };
  const token = jwt.sign(payload, secret, header);

  return res.status(200).json({ token });
}

async function create(req, res) {
  const { name, email, password } = req.body;

  const user = await usersService.create({ name, email, password });

  if (user === 'missing values') return res.status(400).json(errs.ERR_VALUES);
  if (user === 'email exists') return res.status(409).json(errs.ERR_EMAIL);

  return res.status(201).json(user);
}

async function newAdmin(req, res) {
  const { email, password, name } = req.body;
  const { role } = req.user;

  const result = await usersService.newAdmin({ email, password, name, role });

  if (result.message === 'Only admins can register new admins') {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(201).json(result);
}

module.exports = {
  create,
  login,
  newAdmin,
};
