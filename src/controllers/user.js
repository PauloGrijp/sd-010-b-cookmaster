const express = require('express');
const rescue = require('express-rescue');
const { toLogItIn, checkEmailAddress } = require('../middlewares/validLogin');
const { createUser } = require('../models/user');

const router = express.Router();

router.post('/', 
toLogItIn,
checkEmailAddress,
rescue(async (req, res) => {
console.log('controller');
const infoUser = req.body;
const data = await createUser(infoUser);
const userData = data.ops[0];
const { name, email, role, _id } = userData;
return res.status(201).json({ user: { name, email, role, _id } });
}));

module.exports = router;
