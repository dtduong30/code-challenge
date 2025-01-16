import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ origin: process.env.CORS_ORIGIN, credentials: true }),
  rateLimiter,
  morgan('dev'),
];

export default middlewares;