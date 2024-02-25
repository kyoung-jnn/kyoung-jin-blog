import generateSitemap from '@/scripts/sitemap';
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
    const sitemap = await generateSitemap();

    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);

    res.end();
  } catch (err) {
    return res.status(500).send('Error SEO work');
  }
}
