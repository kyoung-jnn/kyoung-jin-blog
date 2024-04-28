import Link from 'next/link';
import * as css from './PostCard.css';

interface Props {
  title: string;
  date: string;
  slug: string;
}

function PostCard({ title, date, slug }: Props) {
  return (
    <article className={css.wrapper}>
      <Link href={`/posts/${slug}`}>
        <h2 className={css.h2}>{title}</h2>
        <time dateTime={date} className={css.time}>
          {date}
        </time>
      </Link>
    </article>
  );
}

export default PostCard;
