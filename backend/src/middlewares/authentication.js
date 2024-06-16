const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');
const { isTokenRevoked } = require('../utils/revokedTokens');

const verifyAsync = util.promisify(jwt.verify);

const authenticateUser = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ error: 'UN_Authenticated' });
    }

    const decodedToken = await verifyAsync(token, JWT_SECRET);

    const user = await User.findById(decodedToken.id).exec();

    const tokenRevoked = await isTokenRevoked(token);
    if (tokenRevoked) {
      // console.log('Token revoked trying to access ', token);
      return res.status(403).json({ error: 'Forbidden: Token revoked' });
    }
    // console.log('Token is not revoked');

    if (!user) {
      return res.status(401).json({ error: "Token's user not found" });
    }

    // Attach user object to request
    req.user = user;
    console.log('request user ', req.user);
    next(); // Call the next middleware function
  } catch (error) {
    // Handle errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  authenticateUser,
};
