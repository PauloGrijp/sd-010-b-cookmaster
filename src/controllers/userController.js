const express = require('express');
const rescue = require('express-rescue');

const validateUsers = require('../middlewares/validateUsers');
const { createServiceUser,
  getAll } = require('../services/userService');

const routerUsers = express.Router();

routerUsers.get('/', async (_req, res) => {
  const result = await getAll();
  return res.status(200).json(result);
});

routerUsers.post('/', validateUsers, rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

   const createdUsers = await createServiceUser(name, email, password);

   if (createdUsers.isError) {
     return next(createdUsers);
   }

   const newUser = {
     name,
     email,
     role: createdUsers.role,
     _id: createdUsers.id,
   };

   return res.status(201).json({ user: newUser });
}));

module.exports = {
  routerUsers,
};