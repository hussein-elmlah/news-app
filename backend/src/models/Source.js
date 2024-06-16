const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    category: { type: String },
    language: { type: String },
    country: { type: String },
    subscribers: { type: Number, default: 0 },
  },
//   { timestamps: true, runValidators: true },
);

sourceSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.__v;
  },
});

module.exports = mongoose.model('Source', sourceSchema);
