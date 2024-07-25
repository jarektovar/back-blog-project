import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

config();

const PORT = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NEO API',
    version: '1.0.0',
    description: 'Documentacion API NEO BLOG',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./api/routes/*.js', './api/models/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Base de datos conectada');
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log('Probando server en el puerto 3000 xd');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno en el servidor';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
