const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, MONGODB_URI } = require('./config');

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

app.use('*', (req, res) => {
  res.status(404).send('Not found');
});

app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception occurred:\n', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
