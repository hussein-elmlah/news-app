const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./lib/logger');
const pinoHttp = require('pino-http');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, MONGODB_URI } = require('./config');

const app = express();
app.use(helmet());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB database');
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB:', err.message);
  });

app.use(express.json());
app.use(pinoHttp({ logger }));

app.use(cors()); // should be confirued in production
// app.use(cors({
//   origin: '*', // add allowed origins only in production
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

app.use('/users', userRoutes);

app.use('*', (req, res) => {
  res.status(404).send('Not found');
});

app.use(errorHandler);

process.on('uncaughtException', (exception) => {
  logger.error('Uncaught exception occurred:\n', exception);
  // here use process.exit(1); and use process manager to restart at any stop in deployment phase.
});
process.on('unhandledRejection', (exception) => {
  logger.error('unhandled Rejection occurred:\n', exception);
  // here use process.exit(1); and use process manager to restart at any stop in deployment phase.
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
