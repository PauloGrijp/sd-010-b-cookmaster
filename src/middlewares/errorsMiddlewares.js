const errorLogin = (err, res, next) => {
  if (err.message === 'Incorrect username or password') {
    return res.status(401).json({ message: err.message });
  }
 return next();
};

const errorNotFound = (err, res, next) => {
  if (err.message === 'recipe not found') {
    return res.status(404).json({ message: err.message });
  }

 return next();
};

const errorMidllewares = (err, _req, res, next) => {
  errorLogin(err, res, next);
  errorNotFound(err, res, next);
  if (err.isError) {
    if (err.message === 'Email already registered') {
      return res.status(409).json({ message: err.message });
    }

    if (err.message === 'All fields must be filed') {
      return res.status(401).json({ message: err.message });
    }

    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  errorMidllewares,
  errorLogin,
};