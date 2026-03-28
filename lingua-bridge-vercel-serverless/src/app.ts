import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import translateRoutes from './routes/translateRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || '*').split(',').map(o => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Main API routes
app.use('/api', translateRoutes);

// Health check endpoints
app.get('/', (_req, res) => {
  res.json({ status: 'API is running' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'API is running' });
});

// NOTE: No app.listen() here — Vercel handles the server lifecycle.
export default app;
