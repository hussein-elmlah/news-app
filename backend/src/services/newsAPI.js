const axios = require('axios');
const CustomError = require('../lib/customError');

// const apiKey = '';
const apiKey = '68fb124a64a44dec8c9cfd73d2c09c42';
const baseUrl = 'https://newsapi.org/v2';

exports.fetchArticles = async (sourceIds) => {
  try {
    const response = await axios.get(`${baseUrl}/top-headlines`, {
      params: {
        sources: sourceIds.join(','),
        apiKey,
      },
    });
    return response.data.articles;
  } catch (error) {
    throw new CustomError(`Failed to fetch articles: ${error.message}`, 500);
  }
};

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
  try {
    const sourcesParam = subscribedSources.join(',');

    const response = await axios.get(`${baseUrl}/top-headlines`, {
      params: {
        sources: sourcesParam,
        page,
        pageSize,
        apiKey,
      },
    });

    return response.data.articles;
  } catch (error) {
    throw new CustomError(`Failed to fetch articles: ${error.message}`, 500);
  }
};
