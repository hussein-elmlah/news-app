const express = require('express');

const router = express.Router();
const UsersController = require('../controllers/usersController');
const asyncWrapper = require('../lib/async-wrapper');
const generateToken = require('../utils/jwtUtils');

const { authenticateUser } = require('../middlewares/authentication');

router.post('/register', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.createUser(req.body));
  if (err) {
    return next(err);
  }
  const token = generateToken(user);

  res.status(201).json({ user, token });
});

router.post('/login', async (req, res, next) => {
  const { body: { email, password } } = req;
  const [err, user] = await asyncWrapper(
    UsersController.loginUser({ email, password }),
  );
  if (err) {
    return next(err);
  }
  res.json(user);
});

router.post('/logout', authenticateUser, async (req, res, next) => {
  const { authorization: token } = req.headers;
  const [err] = await asyncWrapper(UsersController.logoutUser({ token }));
  if (err) {
    return next(err);
  }
  res.json({ message: 'Logout successful' });
});

module.exports = router;
