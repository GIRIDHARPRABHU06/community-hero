const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['pothole', 'streetlight', 'water', 'waste', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  location: {
    address: String,
    lat: Number,
    lng: Number,
  },
  mediaUrl: String,
  mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'none' },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  aiSummary: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Issue', IssueSchema);
