const { createUser } = require('../services/users');

const create = async (req, res) => {
    const { name, password, email } = req.body;
    const created = await createUser(name, email, password, 'user');
    return res.status(201).json({ user: { id: created.id, name, email, role: 'user' } });
};

module.exports = { create };