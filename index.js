const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const MONGO_URI = 'mongodb+srv://giridharprabhu1234_db_user:5HKAnjsetInymwAm@community-hero.1lgfuea.mongodb.net/community-hero?appName=community-hero';
process.env.JWT_SECRET = 'supersecretkey123';
process.env.CLOUDINARY_CLOUD_NAME = 'dtzxgsgux';
process.env.CLOUDINARY_API_KEY = '155268893623643';
process.env.CLOUDINARY_API_SECRET = '0JhMEZmLEsMcd7Ex4ZlZF0fJLS8';
process.env.GEMINI_API_KEY = 'AQ_Ab8RN6KTtt5sZoRi0nXWL9551dgHRiaRa5OX-YEoL7doY_iYMA';

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
}
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    res.status(500).json({ message: 'DB connection failed' });
  }
});

app.use('/auth', require('./routes/auth'));
app.use('/issues', require('./routes/issues'));
app.use('/stats', require('./routes/stats'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

exports.api = functions.https.onRequest(app);