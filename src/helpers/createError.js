const createError = {
  unauthorizedError: message => {
    return {
      statusCode: 401,
      message: message || 'Unauthorized error'
    };
  },
  forbiddenError: message => {
    return {
      statusCode: 403,
      message: message || 'Forbidden error'
    };
  },
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
