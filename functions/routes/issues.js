const router = require('express').Router();
const Issue = require('../models/Issue');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function categorizeWithGemini(title, description) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are a community issue classifier. Given this issue, respond with ONLY a JSON object with two keys: "category" (one of: pothole, streetlight, water, waste, other) and "summary" (one sentence summary under 20 words).
Title: ${title}
Description: ${description}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(text);
  } catch {
    return { category: 'other', summary: description.substring(0, 100) };
  }
}

router.get('/', async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    const issues = await Issue.find(filter).populate('reporter', 'name').sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const { title, description, address, lat, lng } = req.body;
    const ai = await categorizeWithGemini(title, description);
    const issue = await new Issue({
      title,
      description,
      category: ai.category,
      aiSummary: ai.summary,
      location: { address, lat: parseFloat(lat) || 0, lng: parseFloat(lng) || 0 },
      mediaUrl: req.file?.path || null,
      mediaType: req.file ? (req.file.mimetype.startsWith('video') ? 'video' : 'image') : 'none',
      reporter: req.user.id,
    }).save();
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: 10 } });
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/vote', auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    const uid = req.user.id;
    const alreadyVoted = issue.votes.includes(uid);
    if (alreadyVoted) {
      issue.votes.pull(uid);
    } else {
      issue.votes.push(uid);
      await User.findByIdAndUpdate(uid, { $inc: { points: 2 } });
    }
    await issue.save();
    res.json({ votes: issue.votes.length, voted: !alreadyVoted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
