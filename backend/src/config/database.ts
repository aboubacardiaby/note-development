import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
  ],
});

// Log Prisma queries
prisma.$on('query' as never, (e: any) => {
  logger.debug('Prisma Query', {
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`,
    target: e.target,
  });
});

// Log Prisma errors
prisma.$on('error' as never, (e: any) => {
  logger.error('Prisma Error', {
    message: e.message,
    target: e.target,
  });
});

// Log Prisma warnings
prisma.$on('warn' as never, (e: any) => {
  logger.warn('Prisma Warning', {
    message: e.message,
    target: e.target,
  });
});

// Log Prisma info
prisma.$on('info' as never, (e: any) => {
  logger.info('Prisma Info', {
    message: e.message,
    target: e.target,
  });
});

export { prisma };
