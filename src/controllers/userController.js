const statusCode = require('http-status-codes');
const userService = require('../services/userService');
/* const userModel = require('../models/userModel'); */

const create = async (req, res) => {
	const { name, email, password, role } = req.body;
	const user = await userService.create({ name, email, password, role });
	const { id } = user;

	if (user.message === 'Invalid entries. Try again.') {
		return res.status(statusCode.BAD_REQUEST).json(
			{ message: user.message },
		);
	} 
    if (user.message === 'Email already registered') {
        return res.status(statusCode.CONFLICT).json(
			{ message: user.message },
		);
    }
    
	if (!role || role === 'user') {
	return res.status(statusCode.CREATED).json({ user: { name, email, role: 'user', _id: id } });
	}

	return res.status(statusCode.CREATED).json({ user: { name, email, role: 'admin', _id: id } });
};

const createAdmin = async (req, res) => {
   const { name, email, password, role } = req.body;
   const { path } = req;
   const { role: logUser } = req.user;
   const userAdmin = await userService.createAdmin({ name, email, password, role }, path, logUser);
   const { id, role: roleAdmin } = userAdmin;
   if (userAdmin.message) {
	return res.status(statusCode.FORBIDDEN).json({ message: userAdmin.message });
   } 	
   return res.status(statusCode.CREATED).json({ user: { name, email, role: roleAdmin, _id: id } });	
};

module.exports = { create, createAdmin };
