const messages = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_CONFLICT: 'Email already registered',
  EMAIL_PASSWORD_REQUIRED: 'All fields must be filled',
  INCORRECT_CREDENTIALS: 'Incorrect username or password',
  MISSING_JWT: 'missing auth token', 
  JWT_MALFORMED: 'jwt malformed', 
  DB_FAILURE: 'database failed to load resource',
  RECIPE_NOT_FOUND: 'recipe not found',
  NOT_ADMIN: 'Only admins can register new admins',
};

module.exports = messages;