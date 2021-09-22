const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().email().not().empty()
.required(),
  password: Joi.string().not().empty()
.required(),
});

module.exports = schema;