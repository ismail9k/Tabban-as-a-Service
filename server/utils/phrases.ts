// Server-side utility: loads phrases and memes from JSON data files
import phrasesData from "../data/phrases.json";
import memesData from "../data/memes.json";

export interface Phrase {
  id: number;
  text: string;
  translation: string;
  level: string;
}

/**
 * Returns a cryptographically-ish random integer between 0 and max (exclusive)
 */
export function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Picks a random element from an array. Life is random. So is this.
 */
export function randomPick<T>(arr: T[]): T {
  return arr[randomInt(arr.length)]!;
}

/**
 * Returns all phrases.
 */
export function getPhrases(): Phrase[] {
  return phrasesData as Phrase[];
}


/**
 * Returns all intensity levels.
 */
export function getLevels(): string[] {
  return ["mild", "medium", "savage"];
}

/**
 * Returns a random meme URL. Totally scientific selection process.
 */
export function getRandomMeme(): string {
  return `/memes/${randomPick(memesData as string[])}`;
}

/**
 * Formats a phrase into the standard TaaS API response object.
 */
export function formatResponse(phrase: Phrase) {
  return {
    phrase: phrase.text,
    translation: phrase.translation,
    level: phrase.level,
    meme_url: getRandomMeme(),
  };
}
