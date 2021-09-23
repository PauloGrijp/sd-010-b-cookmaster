const MESSAGE = {
  INVALID_ENTRIES: { message: 'Invalid entries. Try again.' },
  EMAIL_ALREADY_EXISTS: { message: 'Email already registered' },
  NO_ENTRY_FIELD: { message: 'All fields must be filled' },
  INCORRECT_USERNAME_OR_PASSWORD: { message: 'Incorrect username or password' },
  RECIPE_NOT_FOUND: { message: 'recipe not found' },
  MISSING_AUTH_TOKEN: { message: 'missing auth token' },
  JWT_MALFORMED: { message: 'jwt malformed' },
  DENIAL_NEW_ADMIN: { message: 'Only admins can register new admins' },
};

const CODE_HTTP = {
  SUCCESS: 200,
  CREATE_SUCCESS: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403, 
  NOT_FOUND: 404,
  CONFLICT: 409,
};

module.exports = {
  MESSAGE,
  CODE_HTTP,
};