import express from 'express';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import middlewares from './middlewares';
import routes from './routes';
import logger from "./utils/logger";
import { env } from './envConfig';

const app = express();

// Apply middlewares
middlewares.forEach(middleware => app.use(middleware));

// Connect to DB
mongoose.connect(env.MONGO_URI).then(() => {
  logger.info('Connected to MongoDB');
}).catch((error) => {
  logger.error('Error connecting to MongoDB', error);
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookmark API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing bookmarks',
    },
    servers: [
      {
        url: `http://${env.HOST}:${env.PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Apply routes
app.use('/api', routes);

export { app, logger };