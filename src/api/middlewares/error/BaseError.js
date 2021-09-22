class BaseError extends Error {
  constructor(description, statusCode) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;