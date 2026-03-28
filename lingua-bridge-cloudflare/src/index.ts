import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { translateRoute } from './routes/translateRoutes';

export interface Env {
  FRONTEND_ORIGIN?: string;
}

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use('*', async (c, next) => {
  const allowedOrigins = (c.env.FRONTEND_ORIGIN || '*').split(',').map((o) => o.trim());
  const corsMiddleware = cors({
    origin: (origin) => {
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return origin;
      }
      return null;
    },
    credentials: true,
  });
  return corsMiddleware(c, next);
});

// Health check
app.get('/', (c) => c.json({ status: 'API is running' }));
app.get('/health', (c) => c.json({ status: 'API is running' }));

// Translation routes
app.route('/api', translateRoute);

export default app;
