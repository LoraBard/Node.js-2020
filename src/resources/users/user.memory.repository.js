const User = require('./user.model');
const taskService = require('../tasks/task.service');

let users = [];

const getAllUsers = async () => {
  return users;
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async user => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

const updateUser = async (id, newUser) => {
  const user = users.find(item => item.id === id);
  if (user) {
    user.name = newUser.name;
    user.login = newUser.login;
    user.password = newUser.password;
    return user;
  }
  return users;
};

const removeUser = async id => {
  const isUserExist = users.find(item => item.id === id);
  if (isUserExist) {
    users = users.filter(user => user.id === id);
    await taskService.nullTaskByUser(id);
  }
  return users;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser
};
