import app from './app';
import { config } from './config/env';

const server = app.listen(config.port, () => {
  console.log(`\n🚀 NoteDevelopment API Server`);
  console.log(`📡 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Server running on: http://localhost:${config.port}`);
  console.log(`🔗 API endpoint: http://localhost:${config.port}/api`);
  console.log(`💚 Health check: http://localhost:${config.port}/api/health\n`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
