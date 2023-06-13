export const getCellStyle = (column: any) => {
  return column.width
    ? { width: `${column.width}px`, minWidth: `${column.width}px`, maxWidth: `${column.width}px` }
    : { width: 'max-content' };
};
