const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redisClient;