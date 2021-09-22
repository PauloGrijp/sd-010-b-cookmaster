const messageError = { message: 'All fields must be filled' };
const incorrectInformation = { message: 'Incorrect username or password' };

const verifyEmail = (email) => {
  const re = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return re.test(email);
 };

 const emailValidations = (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(401).json(messageError);
}
next();
};

const emailValidate = (req, res, next) => {
  const user = req.body;
  if (!verifyEmail(user.email)) {
    return res.status(401).json(incorrectInformation);
}
next();
};

 module.exports = { emailValidations, emailValidate };