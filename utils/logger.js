/**
 * Logging utility for sensitive queries and safety monitoring
 */

let db = null;

function setDatabase(database) {
  db = database;
}

/**
 * Log sensitive queries for human review
 */
async function logSensitiveQuery(query, response, metadata = {}) {
  if (!db) {
    // Fallback to console logging if database not available
    console.warn('[SENSITIVE QUERY]', {
      query: query.substring(0, 200),
      timestamp: new Date().toISOString(),
      ...metadata
    });
    return;
  }

  try {
    await db.collection('sensitive_queries').insertOne({
      query: query.substring(0, 500), // Truncate for storage
      responsePreview: response ? response.substring(0, 200) : '',
      timestamp: new Date(),
      responseLength: response ? response.length : 0,
      reviewed: false,
      ...metadata
    });
  } catch (error) {
    console.error('Error logging sensitive query:', error.message);
  }
}

/**
 * Log general interactions for analytics (anonymized)
 */
async function logInteraction(interactionType, metadata = {}) {
  if (!db) {
    return;
  }

  try {
    await db.collection('interactions').insertOne({
      type: interactionType,
      timestamp: new Date(),
      ...metadata
    });
  } catch (error) {
    console.error('Error logging interaction:', error.message);
  }
}

module.exports = {
  setDatabase,
  logSensitiveQuery,
  logInteraction
};
