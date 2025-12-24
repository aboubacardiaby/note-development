import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  aiModel: process.env.AI_MODEL || 'claude-3-5-sonnet-20240620',
  email: {
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: parseInt(process.env.SMTP_PORT || '587'),
    smtpSecure: process.env.SMTP_SECURE === 'true',
    smtpUser: process.env.SMTP_USER!,
    smtpPass: process.env.SMTP_PASS!,
    from: process.env.EMAIL_FROM || 'noreply@notedevelopment.com',
    fromName: process.env.EMAIL_FROM_NAME || 'NoteDevelopment',
  },
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'ANTHROPIC_API_KEY', 'SMTP_USER', 'SMTP_PASS'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
