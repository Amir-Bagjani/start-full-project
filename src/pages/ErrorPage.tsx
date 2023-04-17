import { ReactNode } from 'react';
import { useRouteError } from 'react-router-dom';

type Props = {
  fallback: ReactNode;
};

const ErrorPage = ({ fallback }: Props) => {
  let error = useRouteError();
  console.log(error);
  return (
    <div>
      {fallback}
      <pre>{JSON.stringify(error, null, 2)}</pre>
      fix that error with refresh
    </div>
  );
};

export default ErrorPage;
