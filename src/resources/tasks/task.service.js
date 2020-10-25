const tasksRepo = require('./task.db.repository');

const getAllTasks = boardId => tasksRepo.getAllTasks(boardId);
const getTaskById = taskId => tasksRepo.getTaskById(taskId);
const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);
const updateTask = (taskId, newTask) => tasksRepo.updateTask(taskId, newTask);
const removeTask = taskId => tasksRepo.removeTask(taskId);
const removeTaskBoard = boardId => tasksRepo.removeTaskBoard(boardId);
const nullTaskByUser = userId => tasksRepo.nullUserTask(userId);

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
  removeTaskBoard,
  nullTaskByUser
};
