const jwt = require('jsonwebtoken');
const createError = require('../helpers/createError');
const { JWT_SECRET_KEY } = require('../common/config');
const User = require('../resources/users/user.model');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw createError.unauthorizedError();
    }
    const token = req.header('Authorization').split(' ')[1];
    const data = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({ _id: data.id, token });
    if (!user) {
      throw createError.unauthorizedError();
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = auth;
