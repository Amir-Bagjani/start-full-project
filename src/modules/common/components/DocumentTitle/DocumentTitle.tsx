import { ReactNode, useLayoutEffect } from 'react';
import { Constants } from 'utils/constants';

type DocumentTitleProps = {
  children?: ReactNode;
  title?: string;
};

export const DocumentTitle = ({ children, title = '' }: DocumentTitleProps) => {
  useLayoutEffect(() => {
    document.title = title + ' | ' + Constants.AppTitle;
  }, [title]);

  return <>{children}</>;
};
