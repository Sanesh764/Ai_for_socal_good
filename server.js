require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { body, validationResult } = require('express-validator');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
let geminiModel = null;

// Initialize MongoDB (optional - can be replaced with MySQL)
let mongoClient = null;
let db = null;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Initialize Gemini model
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim() && apiKey !== 'your_gemini_api_key_here') {
    // Use models/gemini-2.5-flash (fast and efficient) or models/gemini-2.5-pro (more capable)
    geminiModel = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
    console.log('✓ Gemini AI initialized successfully');
    console.log('  API Key:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4));
    console.log('  Model: models/gemini-2.5-flash');
  } else {
    console.warn('⚠ Gemini API key not found or not set. AI features will be limited.');
    console.warn('  Please check your .env file and ensure GEMINI_API_KEY is set correctly.');
    console.warn('  Current value:', apiKey ? '(set but may be invalid)' : '(not set)');
  }
} catch (error) {
  console.error('Error initializing Gemini:', error.message);
  geminiModel = null;
}

// Import utilities
const { setDatabase, logSensitiveQuery } = require('./utils/logger');
const { detectDistress, moderateOutput } = require('./middleware/safety');

// Initialize MongoDB connection
async function initDatabase() {
  try {
    if (process.env.MONGODB_URI) {
      mongoClient = new MongoClient(process.env.MONGODB_URI);
      await mongoClient.connect();
      db = mongoClient.db();
      setDatabase(db); // Set database in logger utility
      console.log('✓ MongoDB connected');
    }
  } catch (error) {
    console.warn('⚠ MongoDB connection failed. Using in-memory storage.');
  }
}

// Initialize database on startup
initDatabase();

// Utility functions are now imported from middleware/safety.js and utils/logger.js

// Import prompt templates
const { getWellbeingPrompt } = require('./config/gemini-prompts');

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Campus Compass - Your Inclusive Campus Companion',
    page: 'home'
  });
});

app.get('/wellbeing', (req, res) => {
  res.render('wellbeing', {
    title: 'Wellbeing Companion - Campus Compass',
    page: 'wellbeing'
  });
});

app.post('/wellbeing/chat',
  [
    body('query').trim().isLength({ min: 1, max: 1000 }).escape(),
    body('language').optional().isIn(['english', 'hindi'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const { query, language = 'english' } = req.body;

    // Check for distress
    const isDistress = detectDistress(query);

    try {
      let aiResponse = '';
      let requiresHumanSupport = false;

      if (isDistress) {
        requiresHumanSupport = true;
        aiResponse = language === 'hindi' 
          ? 'मैं देख रहा हूँ कि आप कठिन समय से गुज़र रहे हैं। कृपया तुरंत मानव सहायता प्राप्त करें। हमारी संकट हॉटलाइन: 1800-HELP-NOW। आप अकेले नहीं हैं।'
          : 'I can see you\'re going through a difficult time. Please seek immediate human support. Our crisis hotline: 1800-HELP-NOW. You are not alone.';
      } else if (geminiModel) {
        try {
          const prompt = getWellbeingPrompt(query, language);
          console.log('Sending request to Gemini API...');
          const result = await geminiModel.generateContent(prompt);
          const response = await result.response;
          aiResponse = response.text();
          console.log('✓ Gemini API response received');
          
          // Moderate output
          const moderationResult = moderateOutput(aiResponse);
          if (!moderationResult.safe) {
            aiResponse = moderationResult.sanitized || 'I apologize, but I cannot provide that type of information. Please consult a professional.';
          }
        } catch (apiError) {
          console.error('Gemini API call error:', apiError);
          console.error('Error details:', {
            message: apiError.message,
            status: apiError.status,
            statusText: apiError.statusText,
            stack: apiError.stack
          });
          
          // More helpful error messages
          if (apiError.message && apiError.message.includes('API_KEY_INVALID')) {
            aiResponse = 'The API key is invalid. Please check your GEMINI_API_KEY in the .env file.';
          } else if (apiError.message && apiError.message.includes('quota')) {
            aiResponse = 'API quota exceeded. Please check your Gemini API usage limits.';
          } else if (apiError.message && apiError.message.includes('model')) {
            aiResponse = 'There was an issue with the AI model. Please try again later.';
          } else {
            aiResponse = `I encountered an error: ${apiError.message || 'Unknown error'}. Please try again or contact support.`;
          }
        }
      } else {
        // Check if API key exists but model wasn't initialized
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey && apiKey.trim() && apiKey !== 'your_gemini_api_key_here') {
          // API key exists but model is null - try to initialize now
          try {
            console.log('Attempting to initialize Gemini model on-demand...');
            geminiModel = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
            console.log('✓ Gemini AI initialized on-demand');
            // Retry the request
            const prompt = getWellbeingPrompt(query, language);
            console.log('Sending request to Gemini API...');
            const result = await geminiModel.generateContent(prompt);
            const response = await result.response;
            aiResponse = response.text();
            console.log('✓ Gemini API response received');
            
            const moderationResult = moderateOutput(aiResponse);
            if (!moderationResult.safe) {
              aiResponse = moderationResult.sanitized || 'I apologize, but I cannot provide that type of information. Please consult a professional.';
            }
          } catch (initError) {
            console.error('Error initializing Gemini on-demand:', initError);
            console.error('Error details:', {
              message: initError.message,
              status: initError.status,
              statusText: initError.statusText
            });
            
            if (initError.message && initError.message.includes('API_KEY_INVALID')) {
              aiResponse = 'The API key is invalid. Please check your GEMINI_API_KEY in the .env file and restart the server.';
            } else if (initError.message && initError.message.includes('model')) {
              aiResponse = 'There was an issue with the AI model. The model name might have changed. Please check the Gemini API documentation.';
            } else {
              aiResponse = `I encountered an error: ${initError.message || 'Unknown error'}. Please try again or contact support.`;
            }
          }
        } else {
          aiResponse = 'I\'m here to help, but I need an API key to provide AI responses. Please add your GEMINI_API_KEY to the .env file and restart the server.';
        }
      }

      // Log sensitive queries
      if (isDistress || detectDistress(query)) {
        await logSensitiveQuery(query, aiResponse, { requiresHumanSupport: isDistress });
      }

      res.json({
        response: aiResponse,
        requiresHumanSupport,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Gemini API error:', error);
      res.status(500).json({
        error: 'I apologize, but I\'m having trouble processing your request. Please try again or contact support.',
        requiresHumanSupport: false
      });
    }
  }
);

app.get('/alerts', async (req, res) => {
  let alerts = [];
  
  if (db) {
    try {
      alerts = await db.collection('alerts').find({
        active: true,
        approved: true
      }).sort({ createdAt: -1 }).limit(10).toArray();
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  }

  res.render('alerts', {
    title: 'Campus Alerts - Campus Compass',
    page: 'alerts',
    alerts: alerts
  });
});

app.get('/accessibility', (req, res) => {
  res.render('accessibility', {
    title: 'Accessibility Features - Campus Compass',
    page: 'accessibility'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About - Campus Compass',
    page: 'about'
  });
});

// Admin route for managing alerts (simplified for hackathon)
app.get('/admin/alerts', (req, res) => {
  res.render('admin-alerts', {
    title: 'Manage Alerts - Campus Compass',
    page: 'admin'
  });
});

app.post('/admin/alerts',
  [
    body('title').trim().isLength({ min: 1, max: 200 }).escape(),
    body('message').trim().isLength({ min: 1, max: 1000 }).escape(),
    body('type').isIn(['info', 'warning', 'emergency'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const { title, message, type } = req.body;

    if (db) {
      try {
        await db.collection('alerts').insertOne({
          title,
          message,
          type,
          active: true,
          approved: true, // In production, this would require admin approval
          createdAt: new Date()
        });
        res.json({ success: true, message: 'Alert created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create alert' });
      }
    } else {
      res.status(503).json({ error: 'Database not available' });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Error - Campus Compass',
    error: 'Something went wrong. Please try again later.'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found - Campus Compass',
    error: 'The page you are looking for does not exist.'
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  if (mongoClient) {
    await mongoClient.close();
  }
  process.exit(0);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Campus Compass server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Production mode - Server ready for requests\n`);
  } else {
    console.log(`🌐 Development mode - http://localhost:${PORT}\n`);
  }
});

// Handle server errors gracefully
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});
