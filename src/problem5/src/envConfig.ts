import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8386,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/hehe',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};