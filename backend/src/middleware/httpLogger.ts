import morgan from 'morgan';
import logger from '../utils/logger';

// Create a stream object to write Morgan logs to Winston
const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Define the Morgan format using built-in response-time token
const morganFormat = ':method :url :status :response-time ms - :res[content-length]';

// Create Morgan middleware
export const httpLogger = morgan(morganFormat, {
  stream,
  skip: (req) => {
    // Skip logging for health check endpoints
    return req.url === '/health' || req.url === '/ping';
  },
});
