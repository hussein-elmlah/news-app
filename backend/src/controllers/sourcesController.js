const Source = require('../models/Source');
const CustomError = require('../lib/customError');
const { fetchSources } = require('../services/newsAPI');
const User = require('../models/User');

exports.getAllSources = (page, pageSize) => fetchSources(page, pageSize);

exports.subscribeSource = async (userId, sourceToSubscribe) => {
  const sourceId = sourceToSubscribe.id;

  const user = await User.findById(userId);
  if (user.subscriptions.includes(sourceId)) {
    throw new CustomError('User is already subscribed to this source', 400);
  }

  let source = await Source.findOne({ id: sourceId });

  if (!source) {
    source = await Source.create({ ...sourceToSubscribe, subscribers: 1 });
  } else {
    source = await Source.findByIdAndUpdate(
      source._id,
      { $inc: { subscribers: 1 } },
      { new: true },
    );
  }

  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { subscriptions: sourceId } },
    { new: true },
  );

  return source;
};

exports.unsubscribeSource = async (userId, sourceId) => {
  const source = await Source.findOneAndUpdate(
    { id: sourceId },
    { $inc: { subscribers: -1 } },
    { new: true },
  );

  if (!source) {
    throw new CustomError('Source not found', 404);
  }

  await User.findByIdAndUpdate(
    userId,
    { $pull: { subscriptions: sourceId } },
    { new: true },
  );

  if (source.subscribers === 0) {
    await Source.findOneAndDelete({ id: sourceId });
  }

  return source;
};

exports.getTopFiveSources = async () => await Source.find().sort({ subscribers: -1 }).limit(5).exec();
