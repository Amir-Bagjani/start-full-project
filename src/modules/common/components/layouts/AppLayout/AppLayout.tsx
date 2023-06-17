import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';

//components
import { Breadcrumbs, Navbar } from 'modules/common/components';

//utils
import { useUser } from 'modules/common/hooks';
import { ROUTES_NAME } from 'routes/routesName';

//types
export type AppLayoutProps = {
  hiddenBreadcrumbs?: boolean;
};

export const AppLayout = ({ hiddenBreadcrumbs = false }: AppLayoutProps) => {
  const { user } = useUser();

  if (!user) return <Navigate to={ROUTES_NAME.login} />;

  return (
    <main>
      <ScrollRestoration />
      <Navbar />
      {hiddenBreadcrumbs ? null : <Breadcrumbs />}
      <section>
        <Outlet />
      </section>
    </main>
  );
};
