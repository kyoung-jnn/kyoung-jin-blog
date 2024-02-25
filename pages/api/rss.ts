import generateRSS from '@/scripts/rss';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { secret } = req.query;
  if (secret !== process.env.TOKEN_FOR_REVALIDATE) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const rssFeed = await generateRSS();

    res.setHeader('Content-Type', 'application/rss+xml');
    res.write(rssFeed.rss2());

    res.end();
  } catch (err) {
    return res.status(500).send('Error SEO work');
  }
}
