const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
    author: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    urlToImage: { type: String },
    publishedAt: { type: Date },
    content: { type: String },
  },
  { timestamps: true, runValidators: true },
);

articleSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module
  .exports = mongoose.model('Article', articleSchema);
