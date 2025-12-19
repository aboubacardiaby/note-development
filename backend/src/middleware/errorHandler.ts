import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Log error with context
  logger.error('Request error', {
    method: req.method,
    url: req.url,
    statusCode,
    message: err.message,
    stack: err.stack,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
