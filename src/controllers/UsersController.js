const usersService = require('../services/UsersService');

const addNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    const validaEmailExists = await usersService.validateEmailExists(email);
    if (validaEmailExists) {
        // console.log('Aqui no email existe');
        return res.status(409).json(validaEmailExists);
    }
    const validaPassEmailAndName = await usersService
    .validatePasswordNameAndEmail(name, email, password);
    if (validaPassEmailAndName) {
        // console.log('Aqui no name');
        return res.status(400).json(validaPassEmailAndName);
    }
    const addUser = await usersService.addNewUser(name, email, password);
    return res.status(201).json({
        user: addUser,
    });
};

module.exports = {
    addNewUser,
};
