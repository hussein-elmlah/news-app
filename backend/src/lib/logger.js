const pino = require('pino');

const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFile = path.join(logDirectory, 'app.log');
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: {
          destination: logFile,
          mkdir: true,
        },
      },
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    ],
  },
});

module.exports = logger;
