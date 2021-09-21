const { connection } = require('./conection');

let err;
const colection = 'users';
const ErrConflict = 409;

const validateEmailExist = async (req, res, next) => {
    const { email } = req.params;
    const connectionUser = await connection()
    .then((db) => db.collection(colection));
    const EmailExist = await connectionUser.findOne({ email });
    if (!EmailExist) {
        err = { message: 'Email already registered' };
        return res.status(ErrConflict).json(err);
    }
    next();
};

module.exports = { validateEmailExist };