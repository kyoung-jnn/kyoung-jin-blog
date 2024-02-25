import generateSitemap from '@/scripts/sitemap';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const sitemap = await generateSitemap();

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate',
    );
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);

    res.end();
  } catch (err) {
    return res.status(500).send('Error SEO work');
  }
}
