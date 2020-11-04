const User = require('./user.model');
const isError = require('../../helpers/isError');
const checkUser = require('../../helpers/checkUser');
const generateHash = require('../../utils/generateHash');

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async id => {
  const user = await User.findById(id);
  return isError(user, id, 'User');
};

const getUserByLogin = async (login, password) => {
  const user = await User.findOne({ login });
  return await checkUser({ user, login, password });
};

async function createUser(user) {
  const userl = await User.create(user);
  return userl;
}

const updateUser = async (id, newUser) => {
  const hashedPassword = await generateHash(newUser.password);
  const user = await User.findByIdAndUpdate(id, {
    ...newUser,
    password: hashedPassword
  });
  return isError(user, id, 'User');
};

const removeUser = async id => {
  const user = await User.findByIdAndDelete(id);
  return isError(user, id, 'User');
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByLogin,
  createUser,
  updateUser,
  removeUser
};
