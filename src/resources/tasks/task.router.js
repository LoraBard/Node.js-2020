const { Router } = require('express');

const tasksService = require('./task.service');
const catchError = require('../../helpers/catchError');
const Task = require('./task.model');

const getAllTasks = async (req, res) => {
  const tasks = await tasksService.getAllTasks(req.boardId);
  return res.status(200).json(tasks.map(Task.toResponse));
};

const getTaskById = async (req, res) => {
  const task = await tasksService.getTaskById(req.params.id);
  return res.status(200).json(Task.toResponse(task));
};

const updateTaskById = async (req, res) => {
  const task = await tasksService.updateTask(req.params.id, req.body);
  return res.status(200).json(Task.toResponse(task));
};

const createTask = async (req, res) => {
  const task = await tasksService.createTask(req.params.boardId, req.body);
  return res.status(200).json(Task.toResponse(task));
};

const deleteTaskById = async (req, res) => {
  await tasksService.removeTask(req.params.id);
  return res.status(200, 204).json(`Task ${req.params.id} has been deleted`);
};

module.exports = Router({ mergeParams: true })
  .get('/', catchError(getAllTasks))
  .get('/:id', catchError(getTaskById))
  .post('/', catchError(createTask))
  .put('/:id', catchError(updateTaskById))
  .delete('/:id', catchError(deleteTaskById));
