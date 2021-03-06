import Link from 'next/link';
import { HTMLProps } from 'react';

const CustomLink = ({
  href,
  ...rest
}: { href: string } & HTMLProps<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href} passHref prefetch={false}>
        <a {...rest} />
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
