const jwt = require('jsonwebtoken');
const users = require('../service/users');

const secret = 'seusecretdetoken';
const jwtConfig = { 
    expiresIn: '1h',
    algorithm: 'HS256',
  };

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    const user = await users
    .createUser(name, email, password);
    if (user.message) return res.status(409).json(user);
    
    return res.status(201).json(user);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const login = await users.loginUser(email, password);
    console.log('login user', login); 
    const { _id, role } = login; 

    if (login.message) return res.status(401).json(login);

      const token = jwt.sign({ 
        payload: { email, password, userId: _id, role } }, secret, jwtConfig);

        res.status(200).json({ token });
};

module.exports = { createUser, loginUser };
