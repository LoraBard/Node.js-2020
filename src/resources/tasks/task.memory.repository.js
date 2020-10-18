const createError = require('http-errors');

let tasks = [];

const Task = require('./task.model');

async function getAllTasks(boardId) {
  return tasks.filter(task => task.boardId === boardId);
}

async function getTaskById(boardId, taskId) {
  const task = tasks.find(
    item => item.boardId === boardId && item.id === taskId
  );
  if (!task) {
    throw new createError.NotFound(`Task ${taskId} not found`);
  }
  return task;
}

async function createTask(boardId, task) {
  const newTask = new Task({ ...task, boardId });
  tasks.push(newTask);
  return newTask;
}

async function updateTask(boardId, taskId, newTask) {
  const task = await getTaskById(boardId, taskId);
  task.columnId = newTask.columnId;
  task.description = newTask.description;
  task.order = newTask.order;
  task.title = newTask.title;
  task.userId = newTask.userId;
  return task;
}

async function removeTask(taskID) {
  tasks = tasks.filter(item => item.id !== taskID);
  return tasks;
}

async function removeTaskBoard(boardID) {
  tasks = tasks.filter(task => task.boardId !== boardID);
  return tasks;
}

async function nullUserTask(userId) {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
  return tasks;
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
