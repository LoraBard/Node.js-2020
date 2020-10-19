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

module.exports = logger;
