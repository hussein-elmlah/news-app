const express = require('express');

const router = express.Router();
const ArticlesController = require('../controllers/articlesController');
const asyncWrapper = require('../lib/async-wrapper');
const { authenticateUser } = require('../middlewares/authentication');

router.get('/subscribed', authenticateUser, async (req, res, next) => {
  const userId = req.user.id;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

  const [err, data] = await asyncWrapper(ArticlesController.getArticlesByUserSubscriptions(userId ,page, pageSize));
  if (err) return next(err);
  res.json(data);
});

module.exports = router;
