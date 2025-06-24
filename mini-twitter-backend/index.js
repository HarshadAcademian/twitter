const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use CORS with env-based frontend origin
const allowedOrigins = [process.env.FRONTEND_URL || '*'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(bodyParser.json());

// ✅ Root route to test server status
app.get('/', (req, res) => {
  res.send('Mini Twitter Backend is running 🚀');
});

// ✅ Mount routes
app.use('/auth', authRoutes);    // Auth: /auth/signup, /auth/login, /auth/me
app.use('/posts', postRoutes);   // Posts: /posts and nested routes

// ✅ Serve frontend in production (optional)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
