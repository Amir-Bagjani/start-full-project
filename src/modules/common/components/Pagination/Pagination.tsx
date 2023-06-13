import { styled } from '@mui/material/styles';

import { getPaginationItems } from './utils';
import { PageLink } from './components/PageLink';

export type PaginationProps = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  onChange: (pageNum: number) => void;
};

export const Pagination = ({ currentPage, lastPage, maxLength, onChange }: PaginationProps) => {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <Container aria-label='Pagination'>
      <PageLink disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)} />
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => onChange(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink disabled={currentPage === lastPage} onClick={() => onChange(currentPage + 1)} />
    </Container>
  );
};

export const Container = styled('nav')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.2rem',
  marginInline: 'auto',
});
