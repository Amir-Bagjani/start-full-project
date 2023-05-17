import { Suspense } from 'react';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// import { user } from '../components/layouts/user';
import ErrorBoundryPage from 'modules/ErrorBoundry/page/ErrorBoundryPage';
import { APPLICATION_ROUTES, LOGIN_ROUTES } from './APPLICATION_ROUTES';

//layoutes
import { AppLayout, AuthLayout } from '../components/layouts';
import { PrintLayout } from 'components/layouts/PrintLayout';
import { User } from 'models/User.type';

const LayoutMap = {
  App: <AppLayout />,
  Login: <AuthLayout />,
  Print: <PrintLayout />,
};

export const getRoutes = (user: User | null) => {
  // console.log("asdsad")
  //   if (!user) {
  //     return createBrowserRouter(
  //       createRoutesFromElements(
  //         <Route errorElement={<ErrorBoundryPage fallback={<div>Something went wrong</div>} />}>
  //           {LOGIN_ROUTES.map((r, i) => (
  //             <Route key={i} element={LayoutMap[r.layout]}>
  //               <Route element={<Navigate to={r.path ?? "/login"} />} />
  //             </Route>
  //           ))}
  //         </Route>
  //       )
  //     )
  //   }

  return createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorBoundryPage fallback={<div>Something went wrong</div>} />}>
        {APPLICATION_ROUTES.map((r, i) => (
          <Route key={i} element={LayoutMap[r.layout]}>
            {r.roles.includes(user?.role ?? 'admin') ? (
              <Route
                path={r.path}
                element={<Suspense fallback='Loading...'>{r.element}</Suspense>}
              />
            ) : (
              <Route element={<Navigate to='*' />} />
            )}
          </Route>
        ))}
      </Route>,
    ),
  );
};
