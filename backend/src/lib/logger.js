const pino = require('pino');
const fs = require('fs');
const path = require('path');
const { multistream } = require('pino-multi-stream');
const pretty = require('pino-pretty');

const logDirectory = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFile = path.join(logDirectory, 'app.log');
const fileStream = pretty({
  colorize: false,
  destination: fs.createWriteStream(logFile, { flags: 'a' }),
  mkdir: true,
});

const consoleStream = pretty({
  // colorize: true,
});

const streams = [
  { stream: fileStream },
  { stream: consoleStream },
];

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
}, multistream(streams));

module.exports = logger;
