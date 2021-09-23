const express = require('express');
const rescue = require('express-rescue');
// const { jwtSetup, jwtCheckEmailPassword } = require('../services/jwtServices');
const { toLogItIn, checkEmailAddress } = require('../services/loginServices');
const { createUser } = require('../models/user');
// const { isJWTvalid, recipesFillersCheck } = require('../middlewares/jwtValidate');

const router = express.Router();

// router.get('/recipes',
// recipesFillersCheck,
// isJWTvalid);

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

// router.post('/login',
// jwtCheckEmailPassword,
// jwtSetup);

// router.post('/recipes',
// recipesFillersCheck,
// isJWTvalid);

module.exports = router;
