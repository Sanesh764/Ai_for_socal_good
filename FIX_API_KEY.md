# Fix: API Key Not Working

## The Problem
You're seeing: "I'm here to help, but I need an API key to provide AI responses."

## The Solution

### Step 1: Verify Your .env File
Your `.env` file should contain:
```
GEMINI_API_KEY=AIzaSyAdGmY4PywkpuccTogp3WxFO9ClO8ASNq0
```

✅ Your API key is already in the file!

### Step 2: Restart the Server
**IMPORTANT:** The server must be restarted after adding/changing the API key.

1. **Stop the current server:**
   - Press `Ctrl + C` in the terminal where the server is running

2. **Start the server again:**
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

### Step 3: Check the Console Output
When the server starts, you should see:
```
✓ Gemini AI initialized successfully
  API Key: AIzaSyAdGm...SNq0
```

If you see:
```
⚠ Gemini API key not found or not set
```
Then check your `.env` file again.

### Step 4: Test the Chat
1. Go to: http://localhost:3000/wellbeing
2. Type a message
3. Click "Send Message"
4. You should now get AI responses!

## Common Issues

### Issue 1: Server not restarted
**Solution:** Always restart the server after changing `.env` file

### Issue 2: API key has extra spaces
**Solution:** Make sure there are no spaces around the `=` sign:
```
✅ Correct: GEMINI_API_KEY=your_key_here
❌ Wrong: GEMINI_API_KEY = your_key_here
```

### Issue 3: API key is invalid
**Solution:** 
- Get a new API key from: https://makersuite.google.com/app/apikey
- Make sure the key starts with `AIzaSy`

### Issue 4: .env file in wrong location
**Solution:** Make sure `.env` is in the project root folder:
```
Ai_for_socal_good/
├── .env          ← Should be here
├── server.js
├── package.json
└── ...
```

## Still Not Working?

1. Check the server console for error messages
2. Verify the API key is correct
3. Make sure you restarted the server
4. Try getting a new API key from Google

---

**After restarting, the chat should work! 🎉**
