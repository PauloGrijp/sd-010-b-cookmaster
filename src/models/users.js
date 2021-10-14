const AppError = require('../errorHandler/AppError');
const httpCodes = require('../constants/httpCodes.json');
const errorMessages = require('../constants/errorMessages.json');
const connection = require('./connection');

exports.createUser = async (userData) => {
  const db = await connection();
  const { email } = userData;
  const alreadyExists = await db.collection('users').findOne({ email });
  if (alreadyExists) {
    throw new AppError(httpCodes.HTTP_CONFLICT, errorMessages.CONFLICT_AUTH);
  }
  return db.collection('users').insertOne(userData);
};
