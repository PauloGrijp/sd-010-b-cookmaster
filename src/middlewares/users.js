const invalidEntries = { message: 'Invalid entries. Try again.' };
const STATUS_400 = 400;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailTester = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

  if (!email) {
    return res.status(STATUS_400).json(invalidEntries);
  }

  if (!emailTester.test(email)) {
    return res.status(400).json(invalidEntries);
  }

  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(STATUS_400).json(invalidEntries);
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidName,
};
