const axios = require('axios');
const CustomError = require('../lib/customError');
const redisClient = require('../lib/redis');
const { apiKey, baseUrl } = require('../config');

exports.fetchSources = async (page = 1, pageSize = 10) => {
  const sourcesCacheKey = 'newsSources';
  const totalCountCacheKey = 'totalCount';
  const TTL_SECONDS = 3600;

  try {
    let sources = await redisClient.get(sourcesCacheKey);
    let totalCount = await redisClient.get(totalCountCacheKey);

    if (sources && totalCount) {
      console.log('Fetching sources from Redis cache...');
      sources = JSON.parse(sources);
      totalCount = JSON.parse(totalCount);
    } else {
      const response = await axios.get(`${baseUrl}/sources`, {
        params: { apiKey },
      });

      sources = response.data.sources;
      totalCount = sources.length;

      await redisClient.set(sourcesCacheKey, JSON.stringify(sources), 'EX', TTL_SECONDS);
      await redisClient.set(totalCountCacheKey, JSON.stringify(totalCount), 'EX', TTL_SECONDS);
    }

    const startIndex = (page - 1) * pageSize;
    const paginatedSources = sources.slice(startIndex, startIndex + pageSize);

    return { sources: paginatedSources, totalResults: totalCount };
  } catch (error) {
    throw new CustomError(`Failed to fetch sources: ${error.message}`, 500);
  }
};

exports.fetchArticlesBySubscriptions = async (subscribedSources, page = 1, pageSize = 10) => {
  const sortedSubscribedSources = subscribedSources.slice().sort();
  const cacheKey = `subscribedArticles:${sortedSubscribedSources.join(',')}:${page}:${pageSize}`;
  const TTL_SECONDS = 3600;
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const sourcesParam = sortedSubscribedSources.join(',');
    const response = await axios.get(`${baseUrl}/everything`, {
      params: {
        sources: sourcesParam,
        page,
        pageSize,
        apiKey,
      },
    });

    await redisClient.set(cacheKey, JSON.stringify(response.data), 'EX', TTL_SECONDS);

    return response.data; // Data is compination of articles array and totalResults number.
  } catch (error) {
    throw new CustomError(`Failed to fetch articles: ${error.message}`, 500);
  }
};
