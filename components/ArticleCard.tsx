import Link from 'next/link';
import * as css from './ArticleCard.css';

interface Props {
  title: string;
  date: string;
  slug: string;
}

function ArticleCard({ title, date, slug }: Props) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className={css.wrapper}>
        <h2 className={css.h2}>{title}</h2>
        <time dateTime={date} className={css.time}>
          {new Date(date).getFullYear()}
        </time>
      </article>
    </Link>
  );
}

export default ArticleCard;
