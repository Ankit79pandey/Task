const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'URL', required: true },
  accessedAt: { type: Date, default: Date.now },
  ip: { type: String },
  userAgent: { type: String },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
