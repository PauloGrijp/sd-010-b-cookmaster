const jwt = require('jsonwebtoken');

const secret = 'segredoSuperSecreto';

const errors = {
  invalidEntries: 'Invalid entries. Try again.',
  malformedJwt: 'jwt malformed',
};

const invalidEntryStatus = 400;
const badTokenStatus = 401;
const jwtConfig = {
  algorithm: 'HS256',
};

const isString = (value) => typeof value === 'string';

const validateNewRecipeInput = (name, ingredients, preparation) => {
  if (!isString(name) || !isString(ingredients) || !isString(preparation)) {
    return {
      status: invalidEntryStatus,
      err: { message: errors.invalidEntries },
    };
  }
  return {};
};

const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, secret, [jwtConfig]);
    return payload;
  } catch (error) {
    return {
      status: badTokenStatus,
      err: { message: errors.malformedJwt },
    };
  }
};

module.exports = {
  validateNewRecipeInput,
  validateToken,
};
