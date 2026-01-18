# Quick Start Guide - Campus Compass

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional, for alerts and logging)
- Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Start MongoDB** (optional)
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud) and update MONGODB_URI in .env
   ```

4. **Run the application**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

5. **Access the application**
   Open your browser to: `http://localhost:3000`

## Testing the Application

### Test Accessibility Features
1. Click the accessibility buttons (bottom right)
2. Toggle high contrast mode
3. Toggle dyslexia-friendly mode
4. Try text-to-speech

### Test Wellbeing Chat
1. Navigate to `/wellbeing`
2. Type a question (e.g., "I'm feeling stressed about exams")
3. Select language (English or Hindi)
4. Send message and view response

### Test Campus Alerts
1. Navigate to `/admin/alerts`
2. Create a test alert
3. View it at `/alerts`

## Troubleshooting

### Gemini API not working
- Check that `GEMINI_API_KEY` is set in `.env`
- Verify the API key is valid
- Check console for error messages

### MongoDB connection failed
- Application will still work without MongoDB
- Alerts and logging will be limited
- Check `MONGODB_URI` in `.env` if using MongoDB

### Port already in use
- Change `PORT` in `.env` to a different port
- Or stop the process using port 3000

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Review [SAFETY_AND_ETHICS.md](./SAFETY_AND_ETHICS.md) for safety information
- Check [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for presentation tips
- See [FUTURE_SCOPE.md](./FUTURE_SCOPE.md) for enhancement ideas

---

**Happy coding! 🧭**
