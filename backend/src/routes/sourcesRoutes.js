const express = require('express');

const router = express.Router();
const SourcesController = require('../controllers/sourcesController');
const asyncWrapper = require('../lib/async-wrapper');
const { authenticateUser } = require('../middlewares/authentication');

router.get('/', async (req, res, next) => {
  const [err, sources] = await asyncWrapper(SourcesController.getAllSources());
  if (err) return next(err);
  res.json(sources);
});

router.post('/subscribe', authenticateUser, async (req, res, next) => {
  const userId = req.user._id;
  const sourceToSubscribe = req.body;
  const [err, source] = await asyncWrapper(SourcesController.subscribeSource(userId, sourceToSubscribe));
  if (err) return next(err);
  res.json(source);
});

router.post('/unsubscribe/:id', authenticateUser, async (req, res, next) => {
  const userId = req.user._id;
  const sourceId = req.params.id;
  const [err, source] = await asyncWrapper(SourcesController.unsubscribeSource(userId, sourceId));
  if (err) return next(err);
  res.json(source);
});

router.get('/topFive', async (req, res, next) => {
  const [err, sources] = await asyncWrapper(SourcesController.getTopFiveSources());
  if (err) return next(err);
  res.json(sources);
});

module.exports = router;
