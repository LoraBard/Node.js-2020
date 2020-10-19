const Board = require('./board.model');
const createError = require('../../helpers/createError');
const taskService = require('../tasks/task.service');

let boards = [];

async function getAllBoards() {
  return boards;
}

async function getBoard(id) {
  const board = boards.find(item => item.id === id);
  if (!board) {
    throw createError.notFound(`Board ${id} not found`);
  }
  return board;
}

async function createBoard(board) {
  if (board) {
    const newBoard = new Board(board);
    boards.push(newBoard);
    return newBoard;
  }
  return boards;
}

async function updateBoard(id, newBoard) {
  const board = await getBoard(id);
  board.title = newBoard.title;
  board.columns = newBoard.columns;
  return board;
}

async function removeBoard(id) {
  const board = await getBoard(id);
  boards = boards.filter(item => item.id !== id);
  taskService.removeTaskBoard(id);
  return board;
}

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};
