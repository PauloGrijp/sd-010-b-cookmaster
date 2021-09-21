const userValidations = require('../services/userValidations');

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  const { id, message } = await userValidations.createUserValidations({
    name, email, password, role,
  });
  
  // console.log(create);
  return res.status(200).json({ _id: id, name, email, password, role: 'user' });
};

module.exports = {
  createUser,
};
