import Link from 'next/link';
import * as css from './PostCard.css';

interface Props {
  title: string;
  date: string;
  slug: string;
}

function PostCard({ title, date, slug }: Props) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className={css.wrapper}>
        <h2 className={css.h2}>{title}</h2>
        <time dateTime={date} className={css.time}>
          {date}
        </time>
      </article>
    </Link>
  );
}

export default PostCard;
