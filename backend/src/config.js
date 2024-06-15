require('dotenv').config();

const { JWT_SECRET, PORT, MONGODB_URI } = process.env;

module.exports = {
  JWT_SECRET: JWT_SECRET || 'local_JWT_Secret_test123',
  PORT: parseInt(PORT, 10) || 3000,
  MONGODB_URI: MONGODB_URI || 'mongodb://localhost:27017/news_db',
};
