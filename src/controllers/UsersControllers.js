const Service = require('../services');

const createItem = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await Service.users.createItem(name, email, password);

    if (user.err){
    return res.status(user.err.status).json(user.err.message);
    } 

    return res.status(201).json(user);
};

module.exports = {
    createItem,
};