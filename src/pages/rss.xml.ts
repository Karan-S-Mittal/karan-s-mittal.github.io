import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { externalWriting } from '@data/publications';
import talksData from '@data/talks.json';
import { talkTypeLabel, type Talk } from '../types/talks';

// Everything listed on /publications/: essays, articles published elsewhere,
// and talks. Newest first.
export async function GET(context: APIContext) {
  const essays = (await getCollection('blog', ({ data }) => !data.draft)).map((post) => ({
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
    link: `/writing/${post.id}/`,
  }));

  const articles = externalWriting.map((item) => ({
    title: item.title,
    pubDate: new Date(item.pubDate),
    description: `Published at ${item.publication}. ${item.description}`,
    link: item.href,
  }));

  const talks = talksData.talks.map((talk) => ({
    title: talk.title,
    pubDate: new Date(talk.date),
    description: `${talkTypeLabel[talk.type as Talk['type']]} at ${talk.event}, ${talk.org}. ${talk.description}`,
    link: talk.links[0]?.url ?? `/publications/#talks`,
  }));

  return rss({
    title: `${SITE.name} | Writing and talks`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: [...essays, ...articles, ...talks].sort(
      (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
    ),
  });
}
