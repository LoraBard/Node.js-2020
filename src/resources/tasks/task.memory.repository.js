let tasks = [];

const Task = require('./task.model');

async function getAllTasks(boardId) {
  return tasks.filter(task => task.boardId === boardId);
}

async function getTaskById(boardId, taskId) {
  return tasks.find(item => item.boardId === boardId && item.id === taskId);
}

async function createTask(boardId, task) {
  const newTask = new Task({ ...task, boardId });
  tasks.push(newTask);
  return newTask;
}

async function updateTask(boardId, taskId, newTask) {
  tasks.map(task => {
    if (task.boardId === boardId && task.id === taskId) {
      task.columnId = newTask.columnId;
      task.description = newTask.description;
      task.order = newTask.order;
      task.title = newTask.title;
      task.userId = newTask.userId;
    }
    return task;
  });
  return tasks;
}

async function removeTask(taskID) {
  tasks = tasks.filter(task => task.id !== taskID);
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
