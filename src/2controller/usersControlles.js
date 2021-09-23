const { createUsersService } = require('../3services/usersService');

const STATUS_OK = 201;

const createusers = async (req, res) => {
  const answer = await createUsersService(req.body);
  const { status, message, name, email, role, _id } = answer;
  if (status) {
    return res.status(status).json({ message });
  }
  return res.status(STATUS_OK).json({ user: { name, email, role, _id } });
};

module.exports = {
  createusers,
};
