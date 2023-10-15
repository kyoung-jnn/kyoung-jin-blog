/* eslint-disable react/no-children-prop */
import Image from './Image';
import Video from './Video';
import Link from 'next/link';

interface Props {
  mdString: MdStringObject;
}

function Markdown({ mdString }: Props) {
  return (
    <ReactMarkdown
      children={mdString.parent}
      remarkPlugins={[remarkGfm]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        p: (paragraph: any) => {
          const { node } = paragraph;

          if (node.children[0].tagName === 'img') {
            const image = node.children[0];

            const alt = image.properties.alt;
            const regex = /\.(png|webp|jpeg|jpg|gif)$/;
            const hasCaption = !regex.test(alt);

            return (
              <Image
                src={image.properties.src}
                alt={alt}
                priority
                {...(hasCaption && { caption: alt })}
              />
            );
          }
          return <p>{paragraph.children}</p>;
        },
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={coldarkDark}
              language={match[1]}
              showLineNumbers={true}
              PreTag="div"
              customStyle={{ fontSize: 14, borderRadius: 5 }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        a: ({ children, href, ...attributes }) => (
          <Link {...attributes} href={href as string} target="_blank">
            {children}
          </Link>
        ),
        video: Video,
      }}
    />
  );
}

export default Markdown;
