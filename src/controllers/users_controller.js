const { create, login } = require('../services/user_service');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(name, email, password, 'CONTROLLER');
    const user = await create(name, email, password);
   // console.log(user, 'CONTROLLER');
    return res.status(201).json({ user });
};

const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await login(email, password);

    if (user.token) {
        return res.status(200).json(user);
    }
    return res.status(401).json(user);
};

module.exports = {
    createUser,
    LoginUser,
};