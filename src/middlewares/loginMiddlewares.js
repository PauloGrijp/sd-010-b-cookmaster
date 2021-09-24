// const { unauthorized, unauthorizedEmailPassword } = require('../error/errorUsers');
// const Users = require('../models/usersModel');

// const checkLogin = async (req, res, next) => {
//   const { email, password } = req.body;
//   const userEmail = await Users.findEmail(email);

//   if (!userEmail || userEmail.password !== password) {
//     unauthorized(res);
//   }
//   next();
// };

// const validEmailPassword = (req, res, next) => {
//   const { email, password } = req.body;
//   const regex = /\S+@\S+\.\S+/;

//   if (!email || !password) {
//     unauthorizedEmailPassword(res);
//   }

//   if (!regex.test(email)) {
//     unauthorized(res);
//   }
//   next();
// };

// module.exports = {
//   checkLogin,
//   validEmailPassword,
// };