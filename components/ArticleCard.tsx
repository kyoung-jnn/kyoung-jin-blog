import * as css from './ArticleCard.css';

interface Props {
  title: string;
  date: string;
}

function ArticleCard({ title, date }: Props) {
  return (
    <article className={css.wrapper}>
      <h2 className={css.h2}>{title}</h2>
      <time dateTime={date} className={css.time}>
        {new Date(date).getFullYear()}
      </time>
    </article>
  );
}

export default ArticleCard;
