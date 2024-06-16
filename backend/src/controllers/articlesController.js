const axios = require('axios');
const User = require('../models/User'); // Adjust path as per your project structure
const { fetchArticlesBySubscriptions } = require('../services/newsAPI');

exports.getArticlesByUserSubscriptions = async (userId, page = 1, pageSize = 10) => {
  console.log('userId', userId);

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const subscribedSources = user.subscriptions;

  const articles = await fetchArticlesBySubscriptions(subscribedSources, page, pageSize);
  return articles;
};
