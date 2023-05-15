import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

type Props = {
  fallback: ReactNode;
};

const ErrorBoundryPage = ({ fallback }: Props) => {
  const error = useRouteError();
  const { t } = useTranslation();
  return (
    <div>
      {fallback}
      <pre>{JSON.stringify(error, null, 2)}</pre>
      {t('refreshPageError')}
    </div>
  );
};

export default ErrorBoundryPage;
