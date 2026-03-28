import { Hono } from 'hono';
import { translateText } from '../controllers/translateController';

export const translateRoute = new Hono();

/**
 * Route: POST /api/translate
 * Description: Translates text into a target language.
 * Body: { text: string, target?: string }
 */
translateRoute.post('/translate', translateText);
