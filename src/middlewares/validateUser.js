let err;
const statusError = 400;

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

const validateInput = (email, name, password, res) => {
    const verifyEmail = validateEmail(email);
    if (!name || !email || !password || !verifyEmail) {
        err = { message: 'Invalid entries. Try again.' };
      return res.status(statusError).json(err);
    }
  };

module.exports = { validateInput };
