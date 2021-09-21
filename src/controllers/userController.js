const express = require('express');
const rescue = require('express-rescue');

const { validateUsers } = require('../middlewares/validateUsers');
const { createServiceUser } = require('../services/userService');

const routerUsers = express.Router();
const routerLogin = express.Router();

routerUsers.post('/', validateUsers, rescue(async (req, res, next) => {
   const { name, email, password, role } = req.body;

   const createdUsers = await createServiceUser(name, email, password, role);

   if (createdUsers.isError) {
     return next(createdUsers);
   }

   const newUser = {
     _id: createdUsers.insertedId,
     name,
     email,
     role,
   };

   return res.status(201).json({ user: newUser });
}));

module.exports = {
  routerUsers,
  routerLogin,
};