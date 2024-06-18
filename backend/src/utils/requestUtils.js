const getIp = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';

const getUserAgent = (req) => req.headers['user-agent'] || '';

module.exports = {
  getIp,
  getUserAgent,
};
