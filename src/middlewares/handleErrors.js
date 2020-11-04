const handleErrors = (err, req, res, next) => {
  if (err) {
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
  return next();
};

module.exports = handleErrors;
