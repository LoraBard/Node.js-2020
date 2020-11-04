const { Router } = require('express');

const boardService = require('./board.service');
const taskService = require('../tasks/task.service');
const taskRouter = require('../tasks/task.router');
const auth = require('../../middlewares/auth');
const catchError = require('../../middlewares/catchError');
const Board = require('./board.model');

const getAllBoards = async (req, res) => {
  const boards = await boardService.getAllBoards();
  return res.status(200).json(boards.map(Board.toResponse));
};

const getBoardById = async (req, res) => {
  const board = await boardService.getBoardById(req.params.id);
  return res.status(200).json(Board.toResponse(board));
};

const createBoard = async (req, res) => {
  const board = await boardService.createBoard(req.body);
  return res.status(200).json(Board.toResponse(board));
};

const updateBoardById = async (req, res) => {
  const board = await boardService.updateBoard(req.params.id, req.body);
  return res.status(200).json(Board.toResponse(board));
};

const deleteBoard = async (req, res) => {
  await taskService.removeTaskBoard(req.params.id);
  await boardService.removeBoard(req.params.id);
  return res.status(204).json(`Board  ${req.params.id} has been deleted`);
};

module.exports = Router()
  .get('/', catchError(getAllBoards))
  .get('/:id', catchError(getBoardById))
  .post('/', catchError(createBoard))
  .put('/:id', catchError(updateBoardById))
  .delete('/:id', catchError(deleteBoard))
  .use(
    '/:boardId/tasks',
    auth,
    (req, res, next) => {
      req.boardId = req.params.boardId;
      next();
    },
    taskRouter
  );
