import { CSSProperties } from 'react';

type SearchBar = {
  borderRadius: CSSProperties['borderRadius'];
};

export type Shape = {
  borderRadius: number;
  searchBar: SearchBar;
};
