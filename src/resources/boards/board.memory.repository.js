const Board = require('./board.model');
const taskService = require('../tasks/task.service');

let boards = [];

async function getAllBoards() {
  return boards;
}

async function getBoard(id) {
  return boards.find(board => board.id === id);
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
  const board = boards.find(item => item.id === id);
  if (board) {
    board.title = newBoard.title;
    board.columns = newBoard.columns;
    return board;
  }
  return boards;
}

async function removeBoard(id) {
  const isBoardExist = boards.find(board => board.id === id);
  if (isBoardExist) {
    boards = boards.filter(board => board.id !== id);
    taskService.removeTaskBoard(id);
  }
  return boards;
}

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};
