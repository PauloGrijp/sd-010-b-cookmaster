// const { findUser } = require('../models/user');

// const toLogItIn = (req, res, next) => {
//     const regex = /((\w+)@(\w+)\.(\w+))/i;
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Invalid entries. Try again.' });
//     }
//     if (!email.match(regex)) {
//         return res.status(400).json({ message: 'Invalid entries. Try again.' });
//     }
//     next();
// };

// const checkEmailAddress = async (req, res, next) => {
//     const regex = /((\w+)@(\w+)\.(\w+))/i;
//     const { email } = req.body;
//     console.log(email, 'email');
//     console.log(req.body, 'req.body');

//     if (!email || !email.match(regex)) {
//         return res.status(400).json({ message: 'Invalid entries. Try again.' });
//     }
//     const check = await findUser(email);
//     console.log(check, 'check');

//     if (check) {
//         return res.status(409).json({ message: 'Email already registered' });
//     }

//     next();
// };

// module.exports = { toLogItIn, checkEmailAddress };