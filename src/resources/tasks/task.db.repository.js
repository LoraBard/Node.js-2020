const Task = require('./task.model');
const isError = require('../../helpers/isError');

async function getAllTasks(boardId) {
  return await Task.find({ boardId });
}

async function getTaskById(id) {
  const task = await Task.findById(id);
  return isError(task, id, 'Task');
}

async function createTask(boardId, task) {
  return await Task.create({ ...task, boardId });
}

async function updateTask(id, newTask) {
  const task = await Task.findByIdAndUpdate(id, newTask);
  return isError(task, id, 'Task');
}

async function removeTask(id) {
  const task = await Task.findByIdAndDelete(id);
  return isError(task, id, 'Task');
}

async function removeTaskBoard(boardId) {
  const q = await Task.deleteMany({ boardId });
  return (await q).deletedCount;
}

async function nullUserTask(userId) {
  const q = Task.updateMany({ userId }, { userId: null });
  return await q;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
  removeTaskBoard,
  nullUserTask
};
