const { createLogger, format, transports } = require('winston');
const { combine, timestamp, cli, colorize, uncolorize, prettyPrint } = format;
const path = require('path');

const errorLog = path.join(__dirname, '../logs/error.log');
const infoLog = path.join(__dirname, '../logs/info.log');

const logger = createLogger({
  level: 'silly',
  format: combine(
    colorize(),
    cli(),
    timestamp({
      format: 'DD.MM.YY HH:mm:ss'
    })
  ),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), format.cli())
    }),
    new transports.File({
      level: 'error',
      format: combine(
        uncolorize(),
        timestamp({
          format: 'DD.MM.YY HH:mm:ss'
        }),
        prettyPrint()
      ),
      filename: errorLog
    }),
    new transports.File({
      level: 'info',
      format: combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.uncolorize(),
        prettyPrint()
      ),
      filename: infoLog
    })
  ],
  exitOnError: true
});

const logParams = (req, res, next) => {
  const { method, url, body, query } = req;

  const { statusCode } = res;
  logger.log({
    level: 'info',
    message: `url: ${url} query: ${JSON.stringify(
      query
    )} body: ${JSON.stringify(body)}`,
    additional: `method: ${method} status: ${statusCode}`
  });

  next();
};

const logError = (error, req, res, next) => {
  if (error) {
    const { method, url, body, query } = req;
    logger.log({
      level: 'error',
      message: `url: ${url} query: ${JSON.stringify(
        query
      )} body: ${JSON.stringify(body)} error: ${error.message}`,
      additional: `method: ${method}`
    });
    return next(error);
  }
  return next();
};

module.exports = {
  logger,
  logParams,
  logError
};
