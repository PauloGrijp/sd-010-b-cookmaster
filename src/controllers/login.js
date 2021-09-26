const { findUser } = require('../services/users');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const result = await findUser(email, password);

    if (result === null) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    return res.status(200).json(result);
};

module.exports = { login };
