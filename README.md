
server linK:-   https://ai-for-socal-good.onrender.com
# 🧭 Campus Compass

**Tagline:** *Your Inclusive Campus Companion for Wellbeing and Information Access*

## Problem Statement

Campus communities face significant barriers in accessing wellbeing information and support, particularly for students with visual impairments, dyslexia, and neurodiverse learning needs. Traditional platforms often lack accessibility features, and students may struggle to find verified, non-diagnostic wellbeing information. During emergencies, clear, accessible communication is critical. Campus Compass addresses these challenges by providing an accessibility-first platform that combines responsible AI assistance with human-centered design, ensuring all students can access support and information regardless of their abilities or circumstances.

## System Architecture

Campus Compass is built on a simple, scalable architecture:

- **Frontend:** EJS templating engine with plain CSS (no frameworks) for maximum compatibility and performance
- **Backend:** Node.js with Express.js for routing and API endpoints
- **AI Integration:** Google Gemini API for text generation (wellbeing companion)
- **Database:** MongoDB for storing alerts and logging sensitive queries (can be replaced with MySQL)
- **Accessibility Layer:** Client-side JavaScript for TTS, high contrast, and dyslexia-friendly modes
- **Safety Layer:** Input validation, output moderation, and distress detection middleware

The system follows a traditional server-side rendering approach, ensuring fast initial load times and compatibility with assistive technologies. All AI interactions are logged for safety review, and the system automatically escalates distress situations to human support resources.

## Features

### 1. AI Wellbeing Companion
- Calm, supportive responses using Gemini API
- Multilingual support (English + Hindi)
- Non-diagnostic, verified information only
- Automatic distress detection and escalation
- Clear disclaimers and safety boundaries

### 2. Accessibility-First Design
- Text-to-speech using Web Speech API
- Dyslexia-friendly reading mode (font, spacing)
- High-contrast mode toggle
- Full keyboard navigation
- Screen reader compatibility (WCAG 2.1 AA/AAA)

### 3. Campus Alerts
- Admin-approved alerts (heatwave, flood, safety)
- Human-reviewed content
- Clear, non-panic-inducing messaging
- Accessible alert presentation

### 4. AI Safety & Ethics
- Input filtering and validation
- Output moderation
- Sensitive query logging
- "AI assistant, not authority" positioning

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ai_for_socal_good
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start MongoDB** (optional, for alerts and logging)
   ```bash
   # MongoDB must be running if using MONGODB_URI
   # Or use a cloud MongoDB instance
   ```

5. **Run the application**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

6. **Access the application**
   Open your browser to `http://localhost:3000`

## Project Structure

```
Ai_for_socal_good/
├── server.js                 # Main Express server
├── package.json              # Dependencies and scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── config/
│   └── gemini-prompts.js    # AI prompt templates
├── middleware/
│   └── safety.js            # Safety and moderation middleware
├── utils/
│   └── logger.js            # Logging utilities
├── views/
│   ├── layout.ejs           # Main layout template
│   ├── index.ejs            # Home page
│   ├── wellbeing.ejs        # Wellbeing chat interface
│   ├── alerts.ejs           # Campus alerts page
│   ├── accessibility.ejs    # Accessibility features page
│   ├── about.ejs            # About page
│   ├── admin-alerts.ejs     # Admin alert management
│   └── error.ejs            # Error page
└── public/
    ├── css/
    │   ├── base.css         # Base styles
    │   ├── components.css   # Component styles
    │   └── accessibility.css # Accessibility modes
    └── js/
        ├── accessibility.js  # Accessibility features
        └── main.js          # Main JavaScript
```

## API Endpoints

### Wellbeing Chat
- `POST /wellbeing/chat` - Send a message to the AI companion
  - Body: `{ query: string, language: 'english' | 'hindi' }`
  - Returns: `{ response: string, requiresHumanSupport: boolean, timestamp: string }`

### Campus Alerts
- `GET /alerts` - View all active alerts
- `GET /admin/alerts` - Admin interface for managing alerts
- `POST /admin/alerts` - Create a new alert
  - Body: `{ title: string, message: string, type: 'info' | 'warning' | 'emergency' }`

## Accessibility Features

### High Contrast Mode
Toggle high contrast mode for better visibility. Meets WCAG AAA contrast ratios.

### Dyslexia-Friendly Mode
Switches to dyslexia-friendly fonts and optimized spacing for easier reading.

### Text-to-Speech
Built-in TTS using Web Speech API. Reads page content aloud for visually impaired users.

### Keyboard Navigation
All interactive elements are keyboard accessible with clear focus indicators.

### Screen Reader Support
Semantic HTML, ARIA labels, and proper heading structure ensure compatibility.

## AI Safety & Ethics

Campus Compass implements multiple safety layers:

1. **Input Validation:** All user inputs are validated and sanitized
2. **Distress Detection:** Automatic detection of crisis keywords triggers human support escalation
3. **Output Moderation:** AI responses are checked for medical/legal advice and filtered
4. **Sensitive Query Logging:** Distress-related queries are logged for human review
5. **Clear Disclaimers:** Users are informed that AI is an assistant, not a replacement for professional help

See [SAFETY_AND_ETHICS.md](./SAFETY_AND_ETHICS.md) for detailed information.

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Templating:** EJS
- **Styling:** Plain CSS (no frameworks)
- **AI:** Google Gemini API
- **Database:** MongoDB (optional, can use MySQL)
- **Validation:** express-validator

## Development

### Running in Development Mode
```bash
npm run dev
```
Uses nodemon for auto-reload on file changes.

### Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `GEMINI_API_KEY` - Your Gemini API key (required for AI features)
- `MONGODB_URI` - MongoDB connection string (optional)

## Limitations & Disclaimers

- **No Medical Diagnosis:** The AI does not provide medical diagnosis, treatment, or medication advice
- **No Legal Advice:** The AI does not provide legal advice
- **Not a Replacement:** The AI is an assistant, not a replacement for professional help
- **API Dependency:** AI features require a valid Gemini API key
- **Database Optional:** Can run without MongoDB (alerts and logging will be limited)

## Contributing

This is a hackathon project. For production use, consider:
- Implementing proper authentication for admin routes
- Adding rate limiting for API endpoints
- Setting up proper error monitoring
- Adding comprehensive tests
- Implementing approval workflow for alerts

## License

MIT License - See LICENSE file for details

## Contact

For questions or support: support@campuscompass.edu

---

**Built with accessibility and social good in mind. 🧭**
