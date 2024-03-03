import generateRSS from '@/scripts/rss';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const rssFeed = await generateRSS();

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate',
    );
    res.setHeader('Content-Type', 'application/xml');
    res.write(rssFeed.rss2());

    res.end();
  } catch (err) {
    return res.status(500).send('Error Create RSS');
  }
}
