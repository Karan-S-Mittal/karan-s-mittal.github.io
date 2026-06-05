export function getReadingTime(body: string, wordsPerMinute = 200): number {
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
