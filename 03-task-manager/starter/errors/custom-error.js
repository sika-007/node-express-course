class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statuCode) => {
  return new CustomAPIError(msg, statuCode);
};

module.exports = { createCustomError, CustomAPIError };
