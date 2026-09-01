export function normalizeTag(tag) {
  return String(tag)
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tagSlug(tag) {
  return normalizeTag(tag).replace(/\s+/g, '-');
}
