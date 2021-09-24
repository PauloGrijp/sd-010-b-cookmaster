const rescue = require('express-rescue');
const service = require('../services/User');

const getAll = rescue(async (_req, res) => {
  const users = await service.getAll();

  res.status(200).json(users);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const user = await service.findById(id);

  if (user.error) return next(user.error);

  res.status(200).json(user);
});

const create = rescue(async (req, res, next) => {
  const newUser = await service.create(req.body);

  if (newUser.error) return next(newUser.error);

  return res.status(201).json({ user: newUser[0] });
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedUser = await service.update(id, name, quantity);

  if (updatedUser.error) return next(updatedUser.error);

  return res.status(200).json(updatedUser);
});

const remove = rescue(async (req, res, next) => {
  const { id } = req.params;

  const removedUser = await service.remove(id);

  if (removedUser.error) return next(removedUser.error);

  return res.status(200).json(removedUser);
});

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};