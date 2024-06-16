const axios = require('axios');
const CustomError = require('../lib/customError');
const redisClient = require('../lib/redis');

// const apiKey = '';
const apiKey = '68fb124a64a44dec8c9cfd73d2c09c42';
const baseUrl = 'https://newsapi.org/v2';

exports.fetchSources = async () => {
  try {
    const response = await axios.get(`${baseUrl}/sources`, {
      params: {
        apiKey,
      },
    });
    return response.data.sources;
  } catch (error) {
    throw new CustomError(`Failed to fetch sources: ${error.message}`, 500);
  }
};

exports.fetchArticlesBySubscriptions = async (subscribedSources, page = 1, pageSize = 10) => {
  const cacheKey = `subscribedArticles:${subscribedSources.join(',')}:${page}:${pageSize}`;
  const TTL_SECONDS = 3600;
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const sourcesParam = subscribedSources.join(',');
    const response = await axios.get(`${baseUrl}/top-headlines`, {
      params: {
        sources: sourcesParam,
        page,
        pageSize,
        apiKey,
      },
    });

    await redisClient.set(cacheKey, JSON.stringify(response.data), 'EX', TTL_SECONDS);

    return response.data; // all the response, need to destruct articles
  } catch (error) {
    throw new CustomError(`Failed to fetch articles: ${error.message}`, 500);
  }
};
