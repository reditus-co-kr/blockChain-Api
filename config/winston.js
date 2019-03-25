const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const moment = require('moment-timezone');

const myFormat = format.printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);
const appendTimestamp = format((info, opts) => {
  if(opts.tz)
    info.timestamp = moment().tz(opts.tz).format();
  return info;
});

// define the custom settings for each transport (file, console)
 const options = {
//   file: {
//     level: 'info',
//     filename: `${appRoot}/logs/app.log`,
//     handleExceptions: true,
//     json: false,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false,
//   },
  console: {
    level: 'silly',
    format: format.combine(
      format.simple(),
      format.colorize({all:true}),
      format.label({ label: 'blockChain-api' }),
      appendTimestamp({ tz: 'Asia/Seoul' }),
      myFormat
    ),
    handleExceptions: true,
    json: false,
    colorize: true,
    showLevel: true
  }
};

const transport = new (winstonDaily)({
    level: 'silly',
    showLevel: true,
    dirname: `${appRoot}/logs/`,
    filename: 'blockChainApi-info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '5m'
});

const errorTransport = new (winstonDaily)({
    level: 'error',
    showLevel: true,
    dirname: `${appRoot}/logs/`,
    filename: 'blockChainApi-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '5m'
});

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.simple(),
    format.label({ label: 'blockChain-api' }),
    appendTimestamp({ tz: 'Asia/Seoul' }),
    myFormat
  ),
  transports: [
    transport,
    errorTransport,
    new transports.Console(options.console)
  ],
  exitOnError: false//, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;