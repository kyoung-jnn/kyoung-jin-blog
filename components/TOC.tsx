import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { getIntersectionObserver } from '@/utils/getInseresctionObserver';
import media from '@/styles/media';

function TOC() {
  const [currentTable, setCurrentTable] = useState<string>('');
  const [tables, setTables] = useState<Element[]>([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentTable);

    // 본문의 h 태그를 가져온다
    const tableElements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .slice(1) // 제목은 제외
      .map((tableElement, index) => {
        tableElement['id'] = tableElement.innerHTML.replace(/\s/g, '-');
        return tableElement;
      });

    setTables(tableElements);

    for (const tableElement of tableElements) {
      observer.observe(tableElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper>
      {tables.map((table, index) => (
        <TableItem
          href={'#' + table.innerHTML.replace(/\s/g, '-')}
          key={index}
          depth={table.tagName}
          isActive={currentTable === table.innerHTML.replace(/\s/g, '-')}
        >
          {table.innerHTML}
        </TableItem>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: none;

  ${media.desktop} {
    display: block;
    position: fixed;
    z-index: 1000;
    margin-top: 150px;
    margin-left: 740px;
    padding: 10px 20px 10px 10px;
    border-left: 1px solid #e5e5e5;
  }
`;

const TableItem = styled.a<{ isActive: boolean; depth: string }>`
  display: block;
  margin-bottom: 10px;
  opacity: 0.8;
  font-size: 15px;
  font-weight: 600;
  color: ${({ isActive }) =>
    isActive ? css`var(--focus-text)` : css`var(--fontColor)`};
  margin-left: ${({ depth }) => {
    if (depth === 'H2') return '7px';
    if (depth === 'H3') return '15px';
  }};
`;

export default TOC;
