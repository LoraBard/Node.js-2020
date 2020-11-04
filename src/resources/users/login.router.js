const { Router } = require('express');

const userService = require('./user.service');
const catchError = require('../../middlewares/catchError');
const User = require('./user.model');
const generateToken = require('../../utils/generateToken');

const loginUser = async (req, res) => {
  const { login, password } = req.body;
  const user = await userService.getUserByLogin(login, password);
  const token = await generateToken(user);
  res.status(200).json({ user: User.toResponse(user), token });
};

module.exports = Router().post('/', catchError(loginUser));
