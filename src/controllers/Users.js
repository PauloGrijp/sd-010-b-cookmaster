const express = require('express');

const userRouter = express.Router();
const userService = require('../services/Users');

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

module.exports = userRouter;
