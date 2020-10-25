const User = require('./user.model');
const isError = require('../../helpers/isError');

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async id => {
  const user = await User.findOne({ _id: id });
  return isError(user, id, 'User');
};

async function createUser(user) {
  const userl = await User.create(user);
  return userl;
}

const updateUser = async (id, newUser) => {
  const user = await User.findByIdAndUpdate(id, newUser);
  return isError(user, id, 'User');
};

const removeUser = async id => {
  const user = await User.findByIdAndDelete(id);
  return isError(user, id, 'User');
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser
};
