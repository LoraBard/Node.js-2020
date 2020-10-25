const createError = require('./createError');

const isError = (result, id, name) => {
  if (!result) {
    throw createError.notFound(`${name} ${id} not found`);
  }
  return result;
};

module.exports = isError;
