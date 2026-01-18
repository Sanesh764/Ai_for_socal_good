# Campus Compass - Project Metadata

## Project Name
**Campus Compass**

## Tagline
*Your Inclusive Campus Companion for Wellbeing and Information Access*

## Problem Statement

Campus communities face significant barriers in accessing wellbeing information and support, particularly for students with visual impairments, dyslexia, and neurodiverse learning needs. Traditional platforms often lack accessibility features, making it difficult for these students to access critical information. Additionally, students may struggle to find verified, non-diagnostic wellbeing information, and during emergencies, clear, accessible communication is critical. Campus Compass addresses these challenges by providing an accessibility-first platform that combines responsible AI assistance with human-centered design, ensuring all students can access support and information regardless of their abilities or circumstances.

## High-Level System Architecture

Campus Compass follows a traditional server-side rendering architecture optimized for accessibility and performance:

### Frontend Layer
- **Templating:** EJS (Embedded JavaScript) for server-side rendering
- **Styling:** Plain CSS (no frameworks) for maximum compatibility and fast load times
- **JavaScript:** Vanilla JavaScript for accessibility features (TTS, high contrast, dyslexia mode)
- **Accessibility:** WCAG 2.1 AA/AAA compliant with semantic HTML and ARIA labels

### Backend Layer
- **Runtime:** Node.js
- **Framework:** Express.js for routing and middleware
- **Validation:** express-validator for input sanitization
- **Database:** MongoDB for alerts and logging (optional, can use MySQL)

### AI Integration Layer
- **Provider:** Google Gemini API (gemini-pro model)
- **Prompt Engineering:** Safe, ethical prompt templates with clear boundaries
- **Safety:** Input filtering, output moderation, distress detection
- **Logging:** Sensitive query logging for human review

### Safety & Ethics Layer
- **Input Filtering:** Validation, sanitization, spam detection
- **Distress Detection:** Keyword-based detection with automatic escalation
- **Output Moderation:** Medical/legal advice filtering
- **Query Logging:** Secure logging of sensitive interactions

### Data Flow
1. User submits query → Input validation & sanitization
2. Distress detection → If detected, immediate crisis resources
3. Gemini API call → Safe prompt with boundaries
4. Response moderation → Filter unsafe content
5. Logging → Sensitive queries logged for review
6. Response delivery → Accessible presentation to user

## Key Design Decisions

### Why EJS over React/SPA?
- Better compatibility with screen readers
- Faster initial load times (critical for low-end devices)
- Simpler deployment and maintenance
- No JavaScript framework dependencies

### Why Plain CSS?
- No framework overhead
- Full control over accessibility features
- Better performance on low-end devices
- Easier to maintain and customize

### Why Gemini API?
- Strong text generation capabilities
- Multilingual support
- Cost-effective for hackathon scale
- Easy integration with Node.js

### Why MongoDB?
- Flexible schema for alerts and logs
- Easy to set up and use
- Can be replaced with MySQL if needed
- Good for rapid prototyping

## Architecture Diagram (Text)

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│  (Screen Reader / Keyboard / Mouse / Touch)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Express.js Server                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Routes & Middleware                            │   │
│  │  - Input Validation                             │   │
│  │  - Distress Detection                           │   │
│  │  - Safety Filtering                             │   │
│  └──────────────────────────────────────────────────┘   │
└─────┬───────────────────────────────┬───────────────────┘
      │                               │
      ▼                               ▼
┌──────────────┐            ┌──────────────────┐
│  Gemini API  │            │    MongoDB       │
│  (AI Chat)   │            │  (Alerts/Logs)   │
└──────────────┘            └──────────────────┘
      │                               │
      │                               │
      ▼                               ▼
┌─────────────────────────────────────────────────────────┐
│              EJS Templates + CSS                        │
│  - Server-side rendering                                │
│  - Accessible HTML structure                           │
│  - Plain CSS styling                                    │
└─────────────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────┐
│         Client-side JavaScript                         │
│  - Text-to-Speech                                       │
│  - High Contrast Mode                                   │
│  - Dyslexia-Friendly Mode                              │
│  - Keyboard Navigation                                  │
└─────────────────────────────────────────────────────────┘
```

## Security Considerations

1. **Input Sanitization:** All user inputs are validated and escaped
2. **XSS Prevention:** HTML escaping in templates
3. **CSRF Protection:** Can be added with csrf middleware
4. **Rate Limiting:** Should be added for production
5. **API Key Security:** Environment variables, never in code
6. **Database Security:** Connection strings in environment variables

## Performance Optimizations

1. **Server-Side Rendering:** Fast initial page loads
2. **Plain CSS:** No framework overhead
3. **Minimal JavaScript:** Only essential client-side code
4. **Static Assets:** Served efficiently by Express
5. **Database Indexing:** Indexes on frequently queried fields

## Scalability Considerations

1. **Stateless Design:** Easy to scale horizontally
2. **Database Connection Pooling:** Efficient database usage
3. **Caching:** Can add Redis for caching
4. **CDN:** Can serve static assets via CDN
5. **Load Balancing:** Can add load balancer for multiple instances

## Deployment Options

1. **Traditional VPS:** Deploy to DigitalOcean, Linode, etc.
2. **Cloud Platforms:** AWS, Azure, GCP
3. **Platform as a Service:** Heroku, Railway, Render
4. **Containerization:** Docker for consistent deployments
5. **Serverless:** Can adapt for serverless (with modifications)

## Monitoring & Maintenance

1. **Error Logging:** Console logging (can add Winston/Sentry)
2. **Health Checks:** Basic endpoint for health monitoring
3. **Database Backups:** Regular MongoDB backups
4. **Security Updates:** Regular dependency updates
5. **Performance Monitoring:** Can add APM tools

---

**Architecture designed for accessibility, safety, and maintainability. 🧭**
