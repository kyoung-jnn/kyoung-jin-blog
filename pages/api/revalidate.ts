import { getPosts } from '@/api/notion';
import { NextApiRequest, NextApiResponse } from 'next';
import { POSTS_PER_PAGE } from 'pages/posts/page/[page]';

// https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { secret, path } = req.query;
  if (secret !== process.env.TOKEN_FOR_REVALIDATE) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    if (path) {
      await res.revalidate(path as string);
    } else {
      // revalidates all page

      // 1. main page
      await res.revalidate('/');

      const posts = await getPosts();

      // 2. post list page
      const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
      const postList = Array.from({ length: totalPages }, (_, index) =>
        res.revalidate(`/posts/page/${index + 1}`),
      );
      await Promise.all(postList);

      // 3. post page
      const detailPosts = posts.map(({ slug }) =>
        res.revalidate(`/posts/${slug}`),
      );
      await Promise.all(detailPosts);
    }

    res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
