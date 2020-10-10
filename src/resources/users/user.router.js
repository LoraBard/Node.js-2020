const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json(`User with id ${req.params.id} not found`);
    }
    return res.status(200).json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.status(200).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json(`User with id ${req.params.id} not found`);
    }
    return res.status(200).json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const user = await userService.removeUser(req.params.id);
    if (!user) {
      return res.status(404).json(`User with id ${req.params.id} not found`);
    }
    return res.status(204).json(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
