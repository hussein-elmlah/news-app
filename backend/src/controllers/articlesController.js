const axios = require('axios');
const User = require('../models/User');
const { fetchArticlesBySubscriptions } = require('../services/newsAPI');

exports.getArticlesByUserSubscriptions = async (userId, page = 1, pageSize = 10) => {
  console.log('userId', userId);

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const subscribedSources = user.subscriptions;

  const data = await fetchArticlesBySubscriptions(subscribedSources, page, pageSize);
  return data;
};
