const axios = require('axios');
const CustomError = require('../lib/customError');
const redisClient = require('../lib/redis');
const { apiKey, baseUrl } = require('../config');

exports.fetchSources = async (page = 1, pageSize = 10) => {
  page = Number(page);
  pageSize = Number(pageSize);
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
  page = Number(page);
  pageSize = Number(pageSize);
  const TTL_SECONDS = 3600;
  const cacheKeyPrefix = 'articles';
  const cachedResults = {};

  try {
    const cachePromises = subscribedSources.map(source =>
      redisClient.get(`${cacheKeyPrefix}:${source}`).catch(err => {
        return null;
      })
    );

    const cachedDataArray = await Promise.all(cachePromises);

    const sourcesToFetch = [];
    cachedDataArray.forEach((cachedData, index) => {
      const source = subscribedSources[index];
      if (cachedData) {
        cachedResults[source] = JSON.parse(cachedData);
      } else {
        sourcesToFetch.push(source);
      }
    });

    const fetchAllArticles = async (source, pageSize) => {
      let page = 1;
      let allArticles = [];
      let totalResults = 0;

      while (true) {
        const response = await axios.get(`${baseUrl}/top-headlines`, {
          params: {
            sources: source,
            page,
            pageSize,
            apiKey,
          },
        });

        const articles = response.data.articles;
        if (articles.length === 0) break;

        allArticles = allArticles.concat(articles);
        totalResults = response.data.totalResults;
        page++;

        if (allArticles.length >= totalResults) break;
      }

      return allArticles;
    };

    if (sourcesToFetch.length > 0) {
      for (const source of sourcesToFetch) {
        const sourceArticles = await fetchAllArticles(source, 100);
        if (sourceArticles.length > 0) {
          cachedResults[source] = sourceArticles;
          await redisClient.set(`${cacheKeyPrefix}:${source}`, JSON.stringify(sourceArticles), 'EX', TTL_SECONDS);
        }
      }
    }

    const articles = [];
    for (const source of subscribedSources) {
      articles.push(...(cachedResults[source] || []));
    }

    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const startIndex = (page - 1) * pageSize;

    const paginatedArticles = articles.slice(startIndex, startIndex + pageSize);

    const totalResults = articles.length;

    const dataToReturn = { articles: paginatedArticles, totalResults };
    return dataToReturn;
  } catch (error) {
    throw new CustomError(`Failed to fetch articles: ${error.message}`, 500);
  }
};
