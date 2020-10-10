const tasksRepo = require('./task.memory.repository');

const getAllTasks = boardId => tasksRepo.getAllTasks(boardId);
const getTaskById = (boardId, taskId) => tasksRepo.getTaskById(boardId, taskId);
const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);
const updateTask = (boardId, taskId, newTask) =>
  tasksRepo.updateTask(boardId, taskId, newTask);
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
