const Board = require('./board.model');
const isError = require('../../helpers/isError');

async function getAllBoards() {
  return await Board.find();
}

async function getBoard(id) {
  const board = await Board.findOne({ _id: id });
  return isError(board, id, 'Board');
}

async function createBoard(board) {
  return await Board.create(board);
}

async function updateBoard(id, newBoard) {
  const board = await Board.findByIdAndUpdate(id, newBoard);
  return isError(board, id, 'Board');
}

async function removeBoard(id) {
  const board = await Board.findByIdAndDelete(id);
  return isError(board, id, 'Board');
}

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};
