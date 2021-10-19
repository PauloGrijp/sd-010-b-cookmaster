const Service = require('../services');

const createItem = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await Service.users.createItem(name, email, password);

    if (user.message) return res.status(user.status).json(user.message);

    return res.status(201).json(user);
};

module.exports = {
    createItem,
};