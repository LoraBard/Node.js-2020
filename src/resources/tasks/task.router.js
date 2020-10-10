const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllTasks(req.boardId);
  return res.status(200).json(tasks);
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await tasksService.getTaskById(req.boardId, req.params.id);
    if (!task) {
      res.status(404).json(`Task with id ${req.params.id} not found`);
    }
    return res.status(200).json(Task.toResponse(task));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const task = await tasksService.updateTask(
      req.boardId,
      req.params.id,
      req.body
    );
    if (!task) {
      res.status(404).json(`Task with id ${req.params.id} not found`);
    }
    return res.status(200).json(Task.toResponse(task));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.createTask(req.boardId, req.body);
  return res.status(200).json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const task = await tasksService.removeTask(req.params.id);
    if (!task) {
      res.status(404).json(`Task with id ${req.params.id} not found`);
    }
    return res.status(200, 204).json(Task.toResponse(task));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
