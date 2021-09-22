const messageError = { message: 'Invalid entries. Try again.' };

const verifyEmail = (email) => {
  const re = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return re.test(email);
 };

  const emailValidations = (req, res, next) => {
    const user = req.body;
    if (!user.name || !user.email || !user.password || !verifyEmail(user.email)) {
      return res.status(400).json(messageError);
  }
  next();
};

module.exports = { emailValidations };