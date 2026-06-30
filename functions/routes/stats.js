const router = require('express').Router();
const Issue = require('../models/Issue');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const [total, open, resolved, byCategory, topUsers] = await Promise.all([
      Issue.countDocuments(),
      Issue.countDocuments({ status: 'open' }),
      Issue.countDocuments({ status: 'resolved' }),
      Issue.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
      User.find().sort({ points: -1 }).limit(5).select('name points badges'),
    ]);
    res.json({ total, open, resolved, byCategory, topUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
