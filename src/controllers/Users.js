const express = require('express');

const userRouter = express.Router();
const userService = require('../services/Users');
const middleware = require('../middleware/ValidateJWT');

userRouter.post('/', async (req, res) => {  
  const { name, email, password } = req.body;
  const result = await userService.createUser({ name, email, password });
  if (result.isError) {
    return res.status(400).json({ message: result.message });
  }
  if (result.emailError) {
    return res.status(409).json({ message: result.message });
  }
  res.status(201).json(result);
});

userRouter.post('/admin', middleware.verifyToken, async (req, res) => {
  const { role } = req.user;
  const { name, email, password } = req.body;
  console.log('role de req.user controller', role);
  const result = await userService.createAdmin({ name, email, password, role });
  if (result.isError) {
    return res.status(403).json({ message: result.message });
  }

  res.status(201).json(result);
});

module.exports = userRouter;
