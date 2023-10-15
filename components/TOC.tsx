import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { getIntersectionObserver } from '@/utils/getInseresctionObserver';

function TOC() {
  const [currentTable, setCurrentTable] = useState<string>('');
  const [tables, setTables] = useState<
    {
      tableElement: Element;
      highlightTag: string;
    }[]
  >([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentTable);

    // 본문의 h 태그를 가져온다
    const tableElements = Array.from(
      document.querySelectorAll('h2 span span, h3 span span, h4 span span'),
    ).map((tableElement) => {
      // console.log(tableElement.parentNode?.parentNode?.nodeName);
      tableElement['id'] = tableElement.innerHTML.replace(/\s/g, '-');

      return {
        tableElement,
        highlightTag: tableElement.parentNode?.parentNode?.nodeName as string,
      };
    });

    setTables(tableElements);

    for (const tableElement of tableElements) {
      observer.observe(tableElement.tableElement);
    }

    return () => observer.disconnect();
  }, []);

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

const Wrapper = styled.div`
  padding: 10px;
  border-left: 1px solid #e5e5e5;
`;

const TableItem = styled.a<{ isActive: boolean; depth: string }>`
  display: block;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ isActive }) =>
    isActive ? css`var(--focus-text)` : css`var(--fontColor)`};
  margin-left: ${({ depth }) => {
    if (depth === 'H3') return '7px';
    if (depth === 'H4') return '15px';
  }};
`;

export default TOC;
