const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config');

const generateAuthToken = async user => {
  const token = jwt.sign({ id: user.id, login: user.login }, JWT_SECRET_KEY);
  user.token = token;
  await user.save();
  return token;
};

module.exports = generateAuthToken;
