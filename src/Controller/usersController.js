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
        if (result === 'email_exist') {
            return res.status(409).json({
                message: 'Email already registered',
             });
        }
        if (!result) {
            return res.status(400).json({
               message: 'Invalid entries. Try again.',
            });
        }
        return res.status(201).json({ user: result });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const createUserAdmin = async (req, res) => {
    const { users } = req.user;
    try {
        const result = await usersService.createUserAdmin(users, req.body);
        if (result === 'is_not_admin') {
            return res.status(403).json({
                message: 'Only admins can register new admins',
             });
        }
        
        return res.status(201).json({ user: result });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { getAll, createUser, createUserAdmin };