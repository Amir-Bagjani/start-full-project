import { CustomTableProps } from '../Table';

export const checkId = <T extends {}>(data: CustomTableProps<T>['rows']): void => {
  const hasId = data.every((item) => item.hasOwnProperty('id'));
  if (!hasId) {
    throw new Error(
      '"id" is missing in Data. You can also use the "getRowId" prop to specify a custom id.',
    );
  }
};
