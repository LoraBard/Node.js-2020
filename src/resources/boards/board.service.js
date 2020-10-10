const boardMemory = require('./board.memory.repository');

const getAllBoards = () => boardMemory.getAllBoards();
const getBoardById = id => boardMemory.getBoard(id);
const createBoard = board => boardMemory.createBoard(board);
const updateBoard = (id, newBoard) => boardMemory.updateBoard(id, newBoard);
const removeBoard = id => boardMemory.removeBoard(id);

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard
};
