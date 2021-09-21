const usersService = require('../Service/usersService');

const getAll = async (req, res) => {
    try {
        const users = await usersService.getAll();
        return res.status(201).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};
const createUser = async (req, res) => {
    try {
        const user = req.body;
       
        const result = await usersService.createUser(user);

        if (!result) {
            return res.status(400).json({
               message: 'Invalid entries. Try again.',
            });
        }
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};
module.exports = { getAll, createUser };