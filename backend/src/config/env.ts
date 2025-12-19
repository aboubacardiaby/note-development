import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  aiModel: process.env.AI_MODEL || 'claude-3-5-sonnet-20240620',
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'ANTHROPIC_API_KEY'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
