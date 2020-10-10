const usersRepo = require('./user.memory.repository');

const getAllUsers = () => usersRepo.getAllUsers();
const getUserById = id => usersRepo.getUserById(id);
const createUser = user => usersRepo.createUser(user);
const updateUser = (id, newUser) => usersRepo.updateUser(id, newUser);
const removeUser = id => usersRepo.removeUser(id);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser
};
