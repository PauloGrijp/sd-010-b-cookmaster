const userModel = require('../models/usersModel');

const STATUS_OK = {
    Created: 201,
};

const addUser = async (req, res) => {
    // abaixo é a função que vai adicionar um produto!
    const { name, email, password } = req.body;
   const newUser = await userModel.createNewUser(name, email, password);
   delete newUser.password;
   return res.status(STATUS_OK.Created).json({ user: newUser });
};

module.exports = {
    addUser,
};