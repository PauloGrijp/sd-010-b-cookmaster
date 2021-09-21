let err;
const statusError = 400;

const validateInput = (req, res, next) => {
    const { name, email, password } = req.params;
    if (!name || !email || !password ) {
        err = { message: 'Invalid entries. Try again.' }
      return res.status(statusError).json(err);
    }
    next();
  };

module.exports = { validateInput }