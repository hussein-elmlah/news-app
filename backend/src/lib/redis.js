const Redis = require('ioredis');
const logger = require('./logger');

const redisClient = new Redis({
  // host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
});

redisClient.on('error', (err) => {
  logger.error('Redis error:', err);
});

module.exports = redisClient;
