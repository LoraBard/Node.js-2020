const catchError = func => async (req, res, next) => {
  try {
    return await func(req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = catchError;
