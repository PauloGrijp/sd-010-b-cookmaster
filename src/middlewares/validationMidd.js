// middlewares de validação - antes de consulta ao banco

const existingFields = (entity, res) => {
  entity.forEach((value) => {
    if (!value || value === '') { 
      return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
    }
});
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const user = [name, email, password];
  existingFields(user, res);

  const emailRegex = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!emailRegex.test(email)) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
}
  next();
};

module.exports = {
  createUser,
};
