const user = require('../models/userModel');

const createUser = async (req, res, _next) => {
  const userInfo = req.body;
  // console.log(data)
  const result = await user.createNewUser(userInfo);
  // depois de obeter o resultando da criação na camada model, fiz a desestruturação
  const { name, email, role, _id } = result;
  // console.log(name, email, role);
  res.status(201).json({ user: { name, email, role, _id}});
};

module.exports = {
  createUser,
};
