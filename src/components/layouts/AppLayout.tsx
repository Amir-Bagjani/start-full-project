import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from 'modules/common/hooks';

// const user: any = null;
// const user = {name: "saeed"};

export const AppLayout = () => {
  const { t } = useTranslation();
  const { user, logout } = useUser();

  if (!!!user?.name) return <Navigate to='/login' />;

  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none' }}>
          <li>
            <NavLink to='/'>{t('Home')}</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard'>{t('Dashboard')}</NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={logout}>logout</button>
      {/* <div>
        <button onClick={() => i18n.changeLanguage('en')}>En</button>
        <button onClick={() => i18n.changeLanguage('fa')}>Fa</button>
        <button onClick={() => i18n.changeLanguage('ar')}>Ar</button>
      </div> */}
      <Outlet />
    </div>
  );
};
