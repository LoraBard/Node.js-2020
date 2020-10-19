const createError = {
  notFound: message => {
    return {
      statusCode: 404,
      message: message || 'Not found'
    };
  },
  internalServerError: message => {
    return {
      statusCode: 500,
      message: message || 'Internal server error'
    };
  }
};

module.exports = createError;
