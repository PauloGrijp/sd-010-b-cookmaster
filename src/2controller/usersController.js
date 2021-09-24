const { createUsersService, createusers } = require('../3services/usersService');

const STATUS_OK = {
  create: 201,
  login: 200,
};

const createUsers = async (req, res) => {
  const answer = await createUsersService(req.body);
  const { status, message, name, email, role, _id } = answer;
  if (status) {
    return res.status(status).json({ message });
  }
  return res.status(STATUS_OK.create).json({ user: { name, email, role, _id } });
};

const login = async (req, res) => {
  const answer = await createusers(req.body);
  const { status, message } = answer;
  if (status) {
    return res.status(status).json({ message });
  }
  return res.status(STATUS_OK.login).json(answer);
};

module.exports = {
  createUsers,
  login,
};
