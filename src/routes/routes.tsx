import {
  Navigate,
  Route,
  RouteObject,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { ROLESType } from '../models';
import { AppLayout } from '../components/layouts';
import AuthLayout from '../components/layouts/AuthLayout';
import ErrorPage from '../pages/ErrorPage';
import { Suspense, lazy } from 'react';
import { user } from '../components/layouts/user';
import PrintLayout from '../components/layouts/PrintLayout';
// import PrintPage from '../pages/PrintPage';

//pages
const Transfer = lazy(() => import(/* webpackPrefetch: true */ '../pages/Transfer'));
const Messages = lazy(() => import(/* webpackPrefetch: true */ '../pages/Messages'));
const Home = lazy(() => import(/* webpackPrefetch: true */ '../pages/Home'));
const Folder = lazy(() => import(/* webpackPrefetch: true */ '../pages/Folder'));
const Dashboard = lazy(() => import(/* webpackPrefetch: true */ '../pages/Dashboard'));
const CounterPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/CounterPage'));
const Contract = lazy(() => import(/* webpackPrefetch: true */ '../pages/Contract'));
const Adjustment = lazy(() => import(/* webpackPrefetch: true */ '../pages/Adjustment'));
const Report = lazy(() => import(/* webpackPrefetch: true */ '../pages/Report'));
const NotFound = lazy(() => import(/* webpackPrefetch: true */ '../pages/NotFound'));
const Login = lazy(() => import(/* webpackPrefetch: true */ '../pages/Login'));
const PrintPage = lazy(() => import(/* webpackPrefetch: true */ '../pages/PrintPage'));

type CustomRouteObject = RouteObject & {
  layout: 'Print' | 'App' | 'Login';
  roles: ROLESType[];
};

// const user = { role: 'editor' } as const;

export const routess: CustomRouteObject[] = [
  {
    path: '/',
    element: <Home />,
    layout: 'App',
    roles: [
      'admin',
      'adjuster',
      'counter',
      'editor',
      'insured',
      'insurer',
      'lossadjuster',
      'receiptionict',
      'registrar',
      'superadjuster',
      'trusteddoctor',
    ],
  },
  {
    path: '/transfer',
    element: <Transfer />,
    // index: true,
    layout: 'App',
    roles: ['admin', 'receiptionict'],
  },
  {
    path: '/folder',
    element: <Folder />,
    layout: 'App',
    roles: ['admin', 'adjuster', 'lossadjuster', 'superadjuster'],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    layout: 'App',
    roles: ['admin', 'editor'],
  },
  {
    path: '/dashboard/report',
    element: <Report />,
    layout: 'App',
    roles: ['admin', 'editor'],
  },
  {
    path: '/dashboard/messages',
    element: <Messages />,
    layout: 'App',
    roles: ['admin', 'editor'],
  },
  {
    path: '/counter',
    element: <CounterPage />,
    layout: 'App',
    roles: ['admin', 'counter'],
  },
  {
    path: '/contract',
    element: <Contract />,
    layout: 'App',
    roles: [
      'admin',
      'adjuster',
      'counter',
      'editor',
      'insured',
      'insurer',
      'lossadjuster',
      'receiptionict',
      'registrar',
      'superadjuster',
      'trusteddoctor',
    ],
  },
  {
    path: '/adjustment',
    element: <Adjustment />,
    layout: 'App',
    roles: ['admin', 'registrar'],
  },
  {
    path: '/login',
    element: <Login />,
    layout: 'Login',
    roles: [
      'admin',
      'adjuster',
      'counter',
      'editor',
      'insured',
      'insurer',
      'lossadjuster',
      'receiptionict',
      'registrar',
      'superadjuster',
      'trusteddoctor',
    ],
  },
  {
    path: '/print',
    element: <PrintPage />,
    layout: 'Print',
    roles: [
      'admin',
      'adjuster',
      'counter',
      'editor',
      'insured',
      'insurer',
      'lossadjuster',
      'receiptionict',
      'registrar',
      'superadjuster',
      'trusteddoctor',
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    layout: 'App',
    roles: [
      'admin',
      'adjuster',
      'counter',
      'editor',
      'insured',
      'insurer',
      'lossadjuster',
      'receiptionict',
      'registrar',
      'superadjuster',
      'trusteddoctor',
    ],
  },
];

const LayoutMap = {
  App: <AppLayout />,
  Login: <AuthLayout />,
  Print: <PrintLayout />,
};
const PathMap = {
  App: '/',
  Login: '/login',
  Print: '',
};

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage fallback={<div>Something went wrong</div>} />}>
      {routess.map((r, i) => (
        <Route
          key={i}
          // path='/'
          // path={PathMap[r.layout]}
          element={LayoutMap[r.layout]}
        >
          {r.roles.includes(user?.role ?? 'admin') ? (
            <Route path={r.path} element={<Suspense fallback='Loading...'>{r.element}</Suspense>} />
          ) : (
            <Route element={<Navigate to='*' />} />
          )}
        </Route>
      ))}
    </Route>,
  ),
);
