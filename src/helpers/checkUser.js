const bcrypt = require('bcrypt');

const createError = require('./createError');

const checkUser = async data => {
  const { user, login, password } = data;
  if (!user) {
    throw createError.forbiddenError(`User with ${login} is not found`);
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createError.unauthorizedError(`User with ${login} is not authorized`);
  }
  return user;
};

module.exports = checkUser;
