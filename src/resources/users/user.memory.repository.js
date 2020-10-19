const createError = require('../../helpers/createError');

const User = require('./user.model');
const taskService = require('../tasks/task.service');

let users = [];

const getAllUsers = async () => {
  return users;
};

const getUserById = async id => {
  const user = users.find(item => item.id === id);
  if (!user) {
    throw createError.notFound(`Task ${id} not found`);
  }
  return user;
};

const createUser = async user => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

const updateUser = async (id, newUser) => {
  const user = await getUserById(id);
  user.name = newUser.name;
  user.login = newUser.login;
  user.password = newUser.password;
  return user;
};

const removeUser = async id => {
  const isUserExist = await getUserById(id);
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
