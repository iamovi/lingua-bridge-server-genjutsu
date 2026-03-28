import type { Context } from 'hono';
// @ts-ignore — CJS module, types inferred at runtime
import translate from 'google-translate-api-x';

/**
 * Controller for translation requests.
 * POST /api/translate
 * Body: { text: string, target?: string }
 */
export const translateText = async (c: Context): Promise<Response> => {
  try {
    const body = await c.req.json<{ text?: unknown; target?: string }>();
    const { text, target = 'en' } = body;

    // Validate that 'text' is a non-empty string
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return c.json(
        {
          success: false,
          message: 'A valid "text" field is required for translation.',
        },
        400
      );
    }

    // Translate using google-translate-api-x (uses native fetch — CF compatible)
    const result = await translate(text, { to: target });

    return c.json({
      success: true,
      translatedText: result.text,
      sourceLang: result.from.language.iso,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return c.json(
      {
        success: false,
        message: 'Internal Server Error: Translation service failed.',
      },
      500
    );
  }
};
