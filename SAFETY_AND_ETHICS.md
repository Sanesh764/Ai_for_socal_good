# AI Safety & Ethics - Campus Compass

## Overview

Campus Compass is built with responsible AI principles at its core. This document outlines the safety measures, ethical considerations, and limitations of the AI system.

## Core Principles

### 1. AI as Assistant, Not Authority
- The AI is positioned as a supportive assistant, not a replacement for human judgment
- All responses include disclaimers about limitations
- Users are encouraged to seek professional help for serious concerns

### 2. No Medical or Legal Advice
- **Strict prohibition** on medical diagnosis, treatment plans, or medication advice
- **Strict prohibition** on legal advice or acting as a legal authority
- Output moderation filters detect and block such content

### 3. Human-in-the-Loop
- Distress situations automatically escalate to human support
- Sensitive queries are logged for human review
- Campus alerts require human approval before posting

## Safety Measures

### Input Filtering

**Validation:**
- All inputs are validated using `express-validator`
- Maximum length limits (1000 characters)
- HTML escaping to prevent XSS attacks
- Spam detection (repetitive content filtering)

**Distress Detection:**
The system detects keywords indicating distress:
- Suicide-related terms
- Self-harm references
- Hopelessness indicators

When detected, the system:
1. Immediately provides crisis resources
2. Logs the query for human review
3. Encourages immediate human support

### Output Moderation

**Content Filtering:**
- Medical diagnosis language detection
- Legal advice pattern matching
- Harmful content identification

**Response Sanitization:**
If unsafe content is detected, the response is replaced with:
- "I cannot provide medical diagnoses. Please consult a healthcare professional."
- "I cannot provide legal advice. Please consult a legal professional."

### Prompt Engineering

**Safe Prompt Templates:**
All Gemini prompts include:
- Clear boundaries and limitations
- Instructions for supportive, non-diagnostic responses
- Emphasis on encouraging professional help
- Tone guidelines (calm, supportive, non-judgmental)

**Example Prompt Structure:**
```
CRITICAL GUIDELINES:
1. NEVER provide medical diagnosis, treatment plans, or medication advice
2. NEVER provide legal advice
3. Use a calm, supportive, and non-judgmental tone
4. Provide general information and coping strategies only
5. Always encourage users to seek professional help for serious concerns
```

### Logging & Monitoring

**Sensitive Query Logging:**
- Queries containing distress keywords are logged
- Logs include: query text (truncated), timestamp, response preview
- Logs are marked for human review
- Stored securely in database (MongoDB)

**Interaction Logging:**
- General interactions logged for analytics (anonymized)
- Helps identify patterns and improve safety

## Ethical Considerations

### Privacy
- User queries are not stored unless they contain distress indicators
- Logged queries are truncated to 500 characters
- No personal identification information is collected
- Users are informed about logging practices

### Transparency
- Clear disclaimers on every page
- Users know the AI's limitations upfront
- Crisis resources are prominently displayed
- "AI assistant, not authority" messaging throughout

### Accessibility
- All features accessible to users with disabilities
- No barriers to accessing support
- Multiple language support (English + Hindi)

### Bias Mitigation
- Prompts designed to be non-judgmental
- Supportive tone regardless of user background
- No assumptions about user identity or circumstances

## Limitations

### What the AI Cannot Do
1. **Medical Diagnosis:** Cannot diagnose conditions or recommend treatments
2. **Legal Advice:** Cannot provide legal guidance or act as legal authority
3. **Crisis Intervention:** Cannot replace human crisis support (escalates instead)
4. **Personalized Treatment:** Cannot provide personalized medical or therapeutic plans

### What the AI Can Do
1. **General Information:** Provide general wellbeing information
2. **Coping Strategies:** Suggest general coping strategies
3. **Resource Guidance:** Direct users to appropriate resources
4. **Supportive Listening:** Provide empathetic, supportive responses
5. **Crisis Escalation:** Detect distress and provide crisis resources

## Escalation Procedures

### Automatic Escalation
When distress is detected:
1. User receives immediate crisis resources
2. Query is logged for human review
3. User is encouraged to contact human support
4. Crisis hotline number is prominently displayed

### Manual Review
- Logged queries reviewed by human moderators
- Follow-up actions taken as needed
- System improvements based on review findings

## Compliance & Standards

### WCAG Compliance
- Meets WCAG 2.1 Level AA standards
- Many features exceed to Level AAA
- Tested with assistive technologies

### Data Protection
- No unnecessary data collection
- Secure storage of sensitive logs
- Compliance with privacy best practices

## Future Improvements

1. **Enhanced Moderation:** More sophisticated content filtering
2. **Multi-language Support:** Additional languages beyond English/Hindi
3. **Approval Workflow:** Admin approval for alerts before posting
4. **Rate Limiting:** Prevent abuse and ensure fair usage
5. **Analytics Dashboard:** Monitor safety metrics and patterns

## Reporting Issues

If you encounter safety or ethical concerns:
1. Contact: support@campuscompass.edu
2. Include: timestamp, query (if applicable), description
3. Response: Issues reviewed within 24 hours

## Conclusion

Campus Compass prioritizes user safety and ethical AI use. The system is designed to assist users while maintaining clear boundaries and ensuring human support is always available when needed. Continuous monitoring and improvement ensure the platform remains safe and beneficial for all users.

---

**Remember:** This AI is an assistant, not a replacement for professional help. For serious concerns, always consult appropriate professionals.
