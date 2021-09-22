const rescue = require('express-rescue');
const Joi = require('joi');
// const jwt = require('jsonwebtoken');

const Services = require('../services');

// const secret = 'cookmaster';

// const jwtConfig = {
//   expiresIn: '7d',
//   algorithm: 'HS256',
// };

const validateCreate = (body) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.string().not().empty().required(),
  }).validate(body);

  return error;
};

const create = rescue(async (req, res, next) => {
  const id = req.userId;
  const entriesError = validateCreate(req.body);
  if (entriesError) return next({ invalidEntries: true });
  
  const adminFound = await Services.admin.find(id);

  if (!adminFound) return next({ onlyAdmin: true });

  const admin = { ...req.body, role: 'admin' };

  const adminCreate = await Services.user.create(admin);
  
  if (!adminCreate) return next({ emailExists: true });
  console.log(adminCreate);

  res.status(201).json({ user: adminCreate });
});

module.exports = { create };
