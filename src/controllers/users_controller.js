const { create } = require('../services/user_service');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(name, email, password, 'CONTROLLER');
    const user = await create(name, email, password);
   // console.log(user, 'CONTROLLER');
    return res.status(201).json({ user });
};

module.exports = {
    createUser,
};