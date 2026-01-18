/**
 * AI Safety and Ethics Middleware
 * Implements input filtering, output moderation, and logging
 */

const { logSensitiveQuery } = require('../utils/logger');

/**
 * Detects distress keywords that require human intervention
 */
function detectDistress(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const distressKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die',
    'self harm', 'hurt myself', 'hopeless', 'no way out',
    'no point', 'give up', 'suicidal', 'ending it'
  ];

  const lowerText = text.toLowerCase();
  return distressKeywords.some(keyword => lowerText.includes(keyword));
}

/**
 * Detects potentially harmful content
 */
function detectHarmfulContent(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const harmfulPatterns = [
    /violence|attack|harm|hurt/i,
    /drug|substance abuse/i,
    /illegal|crime|criminal/i
  ];

  return harmfulPatterns.some(pattern => pattern.test(text));
}

/**
 * Input sanitization middleware
 */
function sanitizeInput(req, res, next) {
  if (req.body && req.body.query) {
    // Basic sanitization (express-validator handles escaping)
    req.body.query = req.body.query.trim();
    
    // Check for distress
    req.body.isDistress = detectDistress(req.body.query);
    
    // Check for harmful content
    req.body.isHarmful = detectHarmfulContent(req.body.query);
  }
  
  next();
}

/**
 * Output moderation
 * Ensures AI responses don't contain harmful content
 */
function moderateOutput(response) {
  if (!response || typeof response !== 'string') {
    return { safe: false, reason: 'Invalid response' };
  }

  // Check for medical diagnosis language
  const medicalDiagnosisPatterns = [
    /you have [a-z]+ disease/i,
    /you are diagnosed with/i,
    /you need medication/i,
    /prescription|dosage|mg|ml/i
  ];

  const hasDiagnosis = medicalDiagnosisPatterns.some(pattern => pattern.test(response));
  
  if (hasDiagnosis) {
    return {
      safe: false,
      reason: 'Medical diagnosis detected',
      sanitized: 'I cannot provide medical diagnoses. Please consult a healthcare professional.'
    };
  }

  // Check for legal advice
  const legalAdvicePatterns = [
    /you should sue/i,
    /legal action/i,
    /file a lawsuit/i,
    /you have a case/i
  ];

  const hasLegalAdvice = legalAdvicePatterns.some(pattern => pattern.test(response));
  
  if (hasLegalAdvice) {
    return {
      safe: false,
      reason: 'Legal advice detected',
      sanitized: 'I cannot provide legal advice. Please consult a legal professional.'
    };
  }

  return { safe: true, response };
}

/**
 * Logging middleware for sensitive queries
 */
async function logSensitiveInteraction(query, response, metadata = {}) {
  const isSensitive = detectDistress(query) || detectHarmfulContent(query);
  
  if (isSensitive) {
    try {
      await logSensitiveQuery(query, response, metadata);
    } catch (error) {
      console.error('Error logging sensitive interaction:', error);
    }
  }
}

module.exports = {
  detectDistress,
  detectHarmfulContent,
  sanitizeInput,
  moderateOutput,
  logSensitiveInteraction
};
