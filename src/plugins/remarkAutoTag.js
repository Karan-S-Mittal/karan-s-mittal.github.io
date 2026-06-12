/**
 * remarkAutoTag.js
 * Remark plugin that auto-links known tag names inside Markdown body text.
 * Wraps matching words/phrases in links to their tag archive pages.
 */

import { findAndReplace } from 'mdast-util-find-and-replace';
import autoTags from '../data/autoTags.json' assert { type: 'json' };

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function slugify(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

/**
 * Build a lookup map: lowercase term → slug
 */
function buildLookup(entries) {
  const map = new Map();
  for (const entry of entries) {
    const slug = entry.slug || slugify(entry.name);
    map.set(entry.name.toLowerCase(), slug);
    for (const alias of entry.aliases || []) {
      map.set(alias.toLowerCase(), slug);
    }
  }
  return map;
}

/**
 * Build regex pattern from all tag names + aliases.
 * Longest terms first to avoid partial matches.
 */
function buildPattern(entries) {
  const terms = [];
  for (const entry of entries) {
    terms.push(entry.name);
    for (const alias of entry.aliases || []) {
      terms.push(alias);
    }
  }

  // Deduplicate and sort longest first
  const unique = [...new Set(terms)];
  unique.sort((a, b) => b.length - a.length);

  if (unique.length === 0) {
    return null;
  }

  return new RegExp(
    `\\b(${unique.map(escapeRegex).join('|')})\\b`,
    'gi'
  );
}

export function remarkAutoTag() {
  const lookup = buildLookup(autoTags);
  const pattern = buildPattern(autoTags);

  if (!pattern) {
    // No tags defined yet; return no-op plugin
    return () => {};
  }

  return (tree) => {
    findAndReplace(
      tree,
      [
        pattern,
        (match) => {
          const slug = lookup.get(match.toLowerCase());
          if (!slug) {
            // Should not happen, but guard just in case
            return { type: 'text', value: match };
          }

          return {
            type: 'link',
            url: `/tags/${slug}/`,
            data: {
              hProperties: {
                class: 'auto-tag',
              },
            },
            children: [{ type: 'text', value: match }],
          };
        },
      ],
      {
        // Skip nodes that should not be auto-linked
        ignore: ['link', 'inlineCode', 'code', 'heading'],
      }
    );
  };
}
