const { Router } = require('express');

const userService = require('./user.service');
const taskService = require('../tasks/task.service');
const catchError = require('../../helpers/catchError');
const User = require('./user.model');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users.map(User.toResponse));
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return res.status(200).json(User.toResponse(user));
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.status(200).json(User.toResponse(user));
};

const updateUserById = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  return res.status(200).json(User.toResponse(user));
};

const deleteUser = async (req, res) => {
  await userService.removeUser(req.params.id);
  await taskService.nullTaskByUser(req.params.id);
  return res.status(204).json(`User ${req.params.id} has been deleted`);
};

module.exports = Router()
  .get('/', catchError(getAllUsers))
  .get('/:id', catchError(getUserById))
  .post('/', catchError(createUser))
  .put('/:id', catchError(updateUserById))
  .delete('/:id', catchError(deleteUser));
