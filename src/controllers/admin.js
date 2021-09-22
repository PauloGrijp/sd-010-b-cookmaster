const rescue = require('express-rescue');
const Joi = require('joi');
const Services = require('../services');

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
  const admin = { ...req.body, role: 'admin' };
  const entriesError = validateCreate(req.body);
  
  if (entriesError) return next({ invalidEntries: true });
  
  const adminFound = await Services.admin.find(id);

  if (!adminFound) return next({ onlyAdmin: true });

  const adminCreate = await Services.user.create(admin);

  if (!adminCreate) return next({ emailExists: true });

  res.status(201).json({ user: adminCreate });
});

module.exports = { create };
