const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const taskRouter = require('../tasks/task.router');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAllBoards();
  return res.status(200).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getBoardById(req.params.id);
    if (!board) {
      res.status(404).json(`Board with id ${req.params.id} not found`);
    }
    return res.status(200).json(board);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.createBoard(req.body);
  return res.status(200).json(board);
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    if (!board) {
      res.status(404).json(`Board with id ${req.params.id} not found`);
    }
    return res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const board = await boardService.removeBoard(req.params.id);
    if (!board) {
      res.status(404).json(`Board with id ${req.params.id} not found`);
    }
    res.status(204).json(board);
  } catch (err) {
    return next(err);
  }
});

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

module.exports = router;
