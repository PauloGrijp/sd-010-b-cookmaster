const connection = require('./connection');

const loginUser = async (email, password) => {
const db = await connection();
const user = await db.collection('users')
.findOne({ email, password }).catch((err) => console.log(err));

return user;
};

module.exports = { loginUser };