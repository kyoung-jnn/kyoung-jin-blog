'use client';

import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { fadeLeft } from '@/utils/animation';
import { getScrollTableIntersectionObserver } from '@/utils/getInseresctionObserver';

function TOC() {
  const [currentTable, setCurrentTable] = useState<string>('');
  const [tables, setTables] = useState<
    {
      tableElement: Element;
      highlightTag: string;
    }[]
  >([]);

  useEffect(() => {
    const observer = getScrollTableIntersectionObserver(setCurrentTable);

    // 본문의 h 태그를 가져온다
    const elements = Array.from(
      document.querySelectorAll('h2 span span, h3 span span, h4 span span'),
    ).map((tableElement) => {
      tableElement['id'] = tableElement.innerHTML.replace(/\s/g, '-');
      return {
        tableElement,
        highlightTag: tableElement.parentNode?.parentNode?.nodeName as string,
      };
    });

    setTables(elements);

    for (const { tableElement } of elements) {
      observer.observe(tableElement);
    }

    return () => observer.disconnect();
  }, []);

  if (!tables.length) return <></>;

  return (
    <Wrapper>
      {tables.map(({ tableElement, highlightTag }, index) => (
        <TableItem
          href={'#' + tableElement.innerHTML.replace(/\s/g, '-')}
          key={index}
          depth={highlightTag}
          isActive={currentTable === tableElement.innerHTML.replace(/\s/g, '-')}
        >
          {tableElement.innerHTML}
        </TableItem>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: grid;
  gap: 10px;
  padding: 4px 0 4px 10px;
  border-left: 1px solid var(--gray-9);

  animation: ${fadeLeft} 0.4s forwards;
`;

const TableItem = styled.a<{ isActive: boolean; depth: string }>`
  font-size: 13px;
  transition: color 0.2s;
  ${({ isActive }) =>
    isActive
      ? css`
          font-weight: 600;
          color: var(--gray-12);
        `
      : css`
          color: var(--gray-9);
        `};

  margin-left: ${({ depth }) => {
    if (depth === 'H3') return '10px';
    if (depth === 'H4') return '20px';
  }};
`;

export default TOC;
