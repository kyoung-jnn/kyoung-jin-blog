'use client';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { NotionRenderer as _NotionRenderer } from 'react-notion-x';

import styled from '@emotion/styled';
import { ExtendedRecordMap } from 'notion-types';

import PostStyles from '@/styles/post-styles';

import { Theme } from './ThemeSwitch';

// https://github.com/NotionX/react-notion-x/blob/master/examples/full/components/NotionPage.tsx

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      // import('prismjs/components/prism-c.js'),
      // import('prismjs/components/prism-cpp.js'),
      // import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      // import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      // import('prismjs/components/prism-coffeescript.js'),
      // import('prismjs/components/prism-diff.js'),
      // import('prismjs/components/prism-git.js'),
      // import('prismjs/components/prism-go.js'),
      // import('prismjs/components/prism-graphql.js'),
      // import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      // import('prismjs/components/prism-objectivec.js'),
      // import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      // import('prismjs/components/prism-reason.js'),
      // import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      // import('prismjs/components/prism-solidity.js'),
      // import('prismjs/components/prism-sql.js'),
      // import('prismjs/components/prism-stylus.js'),
      // import('prismjs/components/prism-swift.js'),
      // import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js'),
    ]);
    return m.Code;
  }),
);

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  },
);

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  },
);

interface Props {
  recordMap: ExtendedRecordMap;
}

function NotionRenderer({ recordMap }: Props) {
  const [init, setInit] = useState(true);

  const { theme } = useTheme();

  useEffect(() => {
    setInit(false);
  }, [theme]);

  return (
    <StyledNotionRenderer
      recordMap={recordMap}
      darkMode={init ? true : theme === Theme.dark}
      components={{
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
      }}
    />
  );
}

export default NotionRenderer;

const StyledNotionRenderer = styled(_NotionRenderer)`
  position: relative;
  width: 100%;
  padding: 0;

  ${PostStyles};
`;
