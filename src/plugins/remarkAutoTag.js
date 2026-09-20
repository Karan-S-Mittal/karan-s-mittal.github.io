/**
 * remarkAutoTag.js
 * Remark plugin that auto-links known tag names inside Markdown body text.
 * Wraps matching words/phrases in links to their tag archive pages.
 */

import { findAndReplace } from 'mdast-util-find-and-replace';
import autoTags from '../data/autoTags.json' assert { type: 'json' };
import { tagSlug } from '../utils/tags.js';

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build a lookup map: lowercase term → slug
 */
function buildLookup(entries) {
  const map = new Map();
  for (const entry of entries) {
    const slug = entry.slug || tagSlug(entry.name);
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
  const indexableTags = autoTags.filter((entry) => (entry.count || 0) >= 2);
  const lookup = buildLookup(indexableTags);
  const pattern = buildPattern(indexableTags);

  if (!pattern) {
    // No tags defined yet; return no-op plugin
    return () => {};
  }

  return (tree) => {
    const replacement = [
      pattern,
      (match, ...args) => {
          // mdast-util-find-and-replace passes the full ancestor stack as the
          // final argument. This is more reliable than matching only the
          // immediate parent, especially when GFM table nodes are nested.
          const info = args.at(-1);
          const insideTable = info?.stack?.some((node) =>
            ['table', 'tableRow', 'tableCell'].includes(node.type)
          );
          if (insideTable) return false;

          const slug = lookup.get(match.toLowerCase());
          if (!slug) {
            // Should not happen, but guard just in case
            return { type: 'text', value: match };
          }

        return {
          type: 'link',
          url: `/topics/${slug}/`,
          data: {
            hProperties: {
              class: 'auto-tag',
            },
          },
          children: [{ type: 'text', value: match }],
        };
      },
    ];

    const options = {
      // Skip nodes that should not be auto-linked
      ignore: ['link', 'inlineCode', 'code', 'heading', 'table', 'tableRow', 'tableCell'],
    };

    // Run per top-level block so a table is never traversed. The markdown
    // pipeline can run this plugin before GFM table nodes are finalized, so
    // relying only on an ancestor ignore test is not sufficient.
    for (const child of tree.children || []) {
      if (child.type !== 'table') {
        findAndReplace(child, replacement, options);
      }
    }
  };
}
