const express = require('express');
const { createUserService, createNewAdminService } = require('../services/userService');
const validateUsersInputToCreate = require('../middleware/validateUser');
const isAdminUser = require('../middleware/userAdmin');

const UsersRouter = express.Router();

UsersRouter.post('/', validateUsersInputToCreate, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUserService(name, email, password);
        const newUser = {
            user,
        };
        res.status(201).json(newUser);
    } catch (err) {
        res.status(err.stateCode).json(err.message);
    }
});

UsersRouter.post('/admin', isAdminUser, async (req, res) => {
    const { name, email, password } = req.body;

    const newAdmin = await createNewAdminService(name, email, password);
    res.status(201).json({ user: newAdmin });
});

module.exports = UsersRouter;
