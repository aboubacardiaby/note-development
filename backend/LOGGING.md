# Logging Documentation

## Overview

This application uses Winston for comprehensive logging across the backend. Logs are written to both the console (for development) and files (for production).

## Log Levels

- **debug**: Detailed information for diagnosing problems (e.g., Prisma queries)
- **info**: General informational messages (e.g., note created, API calls)
- **warn**: Warning messages (e.g., note not found)
- **error**: Error messages with full context

## Log Files

Logs are stored in the `backend/logs/` directory:

- `combined.log`: All logs (max 5MB per file, 5 files)
- `error.log`: Error logs only
- `exceptions.log`: Uncaught exceptions
- `rejections.log`: Unhandled promise rejections

## What Gets Logged

### HTTP Requests/Responses
- Method, URL, status code, response time
- Automatically logged via Morgan middleware

### Database Queries
- All Prisma queries with execution time
- Database errors and warnings

### Application Events
- Note creation, updates, deletions
- AI transformations (start, completion, tokens used)
- Template operations
- Document generation

### Errors
- Full error context including:
  - Request method, URL, params
  - Request body and query parameters
  - Error message and stack trace

## Configuration

Set the log level via environment variable:
```env
LOG_LEVEL=debug  # debug, info, warn, error
```

## Using the Logger

Import the logger in any file:
```typescript
import logger from '../utils/logger';

// Log examples
logger.debug('Detailed debug info', { userId: 123 });
logger.info('User created', { userId: 123, email: 'user@example.com' });
logger.warn('Rate limit approaching', { requestCount: 95 });
logger.error('Database connection failed', { error: err });
```

## Best Practices

1. **Include context**: Always add relevant data as the second parameter
2. **Don't log sensitive data**: Avoid logging passwords, tokens, API keys
3. **Use appropriate levels**:
   - debug: Only needed when debugging
   - info: Normal operations
   - warn: Things that might be problems
   - error: Actual errors
4. **Be concise**: Keep messages clear and actionable
