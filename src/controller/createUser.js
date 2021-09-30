const { createUser } = require('../models/createUser');

const createAction = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await createUser({ name, email, password });
    return res.status(201).json({ user: result });
};

module.exports = createAction;
