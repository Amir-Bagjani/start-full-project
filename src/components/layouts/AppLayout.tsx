import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from 'modules/common/hooks';
import { ROUTES_NAME } from 'routes/routesName';

export const AppLayout = () => {
  const { t } = useTranslation();
  const { user, logout } = useUser();

  if (!user) return <Navigate to='/login' />;

  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none' }}>
          <li>
            <NavLink to={ROUTES_NAME.home}>{t('Home')}</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES_NAME.dashboard}>{t('Dashboard')}</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES_NAME.expenses.base}>{t('Expenses')}</NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={logout}>logout</button>
      <Outlet />
    </div>
  );
};
