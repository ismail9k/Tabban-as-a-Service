// GET /api/tabban
// Returns a random Arabic phrase + meme. The highlight of your day.
// Query params:
//   ?level=mild|medium|savage             – filter by intensity
import {
  getPhrases,
  randomPick,
  formatResponse,
} from "~~/server/utils/phrases";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const level = query.level as string | undefined;

  let phrases = getPhrases();

  // Filter by intensity level if provided
  if (level) {
    phrases = phrases.filter((p) => p.level === level);
  }

  if (phrases.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      data: {
        error: "No phrases found for those filters.",
      },
    });
  }

  const phrase = randomPick(phrases);
  return formatResponse(phrase);
});
