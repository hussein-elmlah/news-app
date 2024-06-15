const RevokedToken = require('../models/RevokedToken');

const isTokenRevoked = async (token) => {
  const result = await RevokedToken.exists({ token });
//   console.log('token not invked ================================', result);
  return result;
};

const revokeToken = async (token) => {
//   console.log(`type of token is = ${typeof token}`);
  const revokedToken = new RevokedToken({ token });
  await revokedToken.save();
};

module.exports = {
  isTokenRevoked,
  revokeToken,
};
